 //----------------------------------  //----------------------------------
 // Global Variables
 //----------------------------------

 //this should eventually be made an array of clothing items?

 var initialglassesPref = 5 ;
 var initialHatPref = 5 ;
 var initialRainJacketPref = 50;
 var initialSweaterPref = 55 ;
 var initialSunscreenPref = 5;
 var initialUmbrellaPref = 50;

 var clothingObjects = [{ "name": "glasses", "weatherType": "sun", "pref": initialglassesPref, "today" : false, "hasPref" : false },
     { "name": "hat", "weatherType": "sun", "pref": initialHatPref ,"today" : false, "hasPref" : false  },
     { "name": "rain-jacket", "weatherType": "rain", "pref": initialRainJacketPref, "today" : false, "hasPref" : false  },
     { "name": "sweater", "weatherType": "temp", "pref": initialSweaterPref, "today" : false, "hasPref" : false  },
     { "name": "sunscreen", "weatherType": "sun", "pref": initialSunscreenPref, "today" : false, "hasPref" : false  },
     { "name": "umbrella", "weatherType": "rain", "pref": initialUmbrellaPref, "today" : false, "hasPref" : false  }
 ]

 var selectedClothingItems;

 //array of all slider elements for selected clothing items
 var $allSliders;

 var checkMarkImg = "<img src='images/checkmark.svg' class='progress-check'/>"

 var headingStep1 = "Click Authorise to Connect Your Google Calendar";
 var headingStep2 = "Select Items";
 var headingStep3 = "Set Item Preferences";
 var headingStep4 = "Set User Alert Preferences";


 //----------------------------------
 // helper functions
 //----------------------------------


 function renderStep1() {
     $("#clothing-items-container").empty().text(headingStep1);
     showStepButtons(1);
     $("#authorize-button").show();
     renderProgressBar(1);

     $("#clothing-items-container").empty();
     //show the initial list of clothing items
 }

 function showStepButtons(stepNumber) {
     $("#step" + stepNumber + "-previous").removeClass("hidden");
     $("#step" + stepNumber + "-next").removeClass("hidden");
 };

 function hideStepButtons(stepNumber) {
     $("#step" + stepNumber + "-previous").addClass("hidden");
     $("#step" + stepNumber + "-next").addClass("hidden");
 };

 //Takes in the current step number and formats the progresss bar (text and checkmark icon)
 function renderProgressBar(currentStep) {

     // console.log('renderProgressBar', 'currentStep:', currentStep)

     var previousStep = currentStep - 1;
     var nextStep = currentStep + 1;

     //put a checkmark on the previous step
     $("#progress-icon-step" + previousStep).empty().append(checkMarkImg);
     $("#progress-text-step" + previousStep).removeClass("doing").addClass("done");

     //remove the checkmark from the current step -> put a number back
     $("#progress-icon-step" + currentStep).empty().text(currentStep);

     $("#progress-text-step" + currentStep).removeClass("todo").addClass("doing");
     //Change the class of the next step
     $("#progress-text-step" + nextStep).removeClass("doing").addClass("todo");

 }

 function renderTodaysClothingItems() {

     for (var i = 0; i < clothingObjects.length; i++) {

       if (clothingObjects[i].today == true) {
         var $span = $("<span>").addClass("imgCheckbox1");
         $img = $("<img>").attr({
             "class": "clothing-item",
             "alt": clothingObjects[i].name,
             "id": "item-" + clothingObjects[i].name,
             "src": "images/icons/" + clothingObjects[i].name + ".png"
         });
         $span.append($img);
         $("#clothing-items-container").append($span);
     }
   }
 }

 function renderClothingItems() {
     $("#clothing-items-container").empty();
     for (var i = 0; i < clothingObjects.length; i++) {
         var $span = $("<span>").addClass("imgCheckbox1");
         $img = $("<img>").attr({
             "class": "clothing-item",
             "data-item": clothingObjects[i].name,
             "data-weather-type": clothingObjects[i].weatherType,
             "alt": clothingObjects[i].name,
             "id": "item-" + clothingObjects[i].name,
             "src": "images/icons/" + clothingObjects[i].name + ".png"
         });
         $span.append($img);
         $("#clothing-items-container").append($span);
     }
 }


 function renderEventClothingItems(eventName, eventTime, clothingItems) {
  var col2 = $("<div>").addClass("col-12");
   var textStart = "For ";
   // var textMiddle = "bring a ";
   var length = clothingItems.length - 1;
   console.log('length', length)
  
   col2.append(textStart + eventName + " at " + eventTime + "pm bring a ");
   for (var i = 0; i < clothingItems.length; i++) {
    if (clothingItems.length > 1) {
      console.log("i",  i);
      console.log("length", length);
      if (length === i) {
        console.log(i);
        col2.append(clothingItems[i]+ ".");
      }
      else {
        col2.append(clothingItems[i] + " and ");
      }
    }
    else {
      col2.append(clothingItems[i]);
    }
   }
   console.log('renderEventAlert', 'eventName:', eventName, 'evnetTime:', eventTime, 'clothingItem:', clothingItems[i])




   // var clothingItemImage = "<img src='images/icons/"+clothingItem+".png' class='clothing-item' alt='"+clothingItem+"''/>";

   var newRow = $("<div>").addClass("row");
   // var col1 = $("<div>").addClass("col-4").append("event");
   
   $("#clothing-items-container").append(newRow.append(col2));

 }


 function renderSelectedItems() {
      console.log(clothingObjects);
     //empty the <div> container
     $("#clothing-items-container").empty();

     var textStart = "Alert me to bring ";
     var $itemID = $("<span>").addClass("item-name");
     var textEnd;

     //go through the items and display them 1 per row on page
     for (var i = 0; i < selectedClothingItems.length; i++) {
         newRow = $("<div>").addClass("row");
         col1 = $("<div>").addClass("col-4").append(selectedClothingItems[i]);
         //select the child element which contains the item data
         var child = selectedClothingItems[i].firstElementChild;
         //get the weather Type data
         var weatherType = $(child).attr("data-weather-type");
         var clothingItem = $(child).attr("data-item");

         // console.log("weatherType", weatherType);

         var $itemControls;

         var $slider = $("<input>").addClass("slider").attr("data-item", clothingItem);
         switch (weatherType) {
             case 'sun':
                 textEnd = " when UV index greater than ";
                 sunSlider = $slider.attr({ "type": "range", "value": getPref(clothingItem), "max": 10, "id": "uv-slider" + i });
                 break;
             case 'temp':
                 textEnd = " when temperature less than ";
                 tempSlider = $slider.attr({ "type": "range", "min": 30, "value": getPref(clothingItem), "max": 80, "id": "temp-slider" + i });
                 break;
             case 'rain':
                 // elements for the rain preferences
                 textEnd = " when chance of rain greater than ";
                 //give each rain slider a unique ID.
                 $slider = $slider.attr({ "type": "range", "value": getPref(clothingItem), "id": "rain-slider" + i });
                 break;
             default:
                 textEnd = " when temperature less than ";
                 tempSlider = $slider.attr({ "type": "range", "min": 30, "value": getPref(clothingItem), "max": 80, "id": "temp-slider" + i });

         }

         //set the name of the item in the span.
         $itemID.text($(child).attr("data-item"));
         console.log('$itemID.text', '$(child).attr("...m"):', $itemID.text())

         $itemControls = $("<p>").append(textStart).append($itemID).append(textEnd).append(" ");

         // console.log(selectedClothingItems[i].attr("data-weather-type"));
         var col2 = $("<div>").addClass("col-8").append($("<div>").addClass("row").append($itemControls).append($slider));
         // console.log('itemControls', $itemControls)
         //append the rows to the page

         $("#clothing-items-container").append(newRow.append(col1).append(col2));
     }

     //set up each of the sliders to display correct values
     $allSliders = $(".slider");

     //go through each slider and add styling and set listeners for change to values    
     for (var i = 0; i < $allSliders.length; i++) {
         var sliderID = $allSliders[i].id;
         var sliderIDSet;



         $("#" + sliderID).rangeslider({

             polyfill: false,
             onInit: function() {
                 var clothingItem = $(child).attr("data-item");
                 if (sliderID.indexOf("rain") != -1) {
                     this.output = $('<div class="range-output" />').insertBefore(this.$range).html(getPref(clothingItem) + "%");

                 } else {
                     this.output = $('<div class="range-output" />').insertBefore(this.$range).html(getPref(clothingItem));
                 }

             },
             onSlide: function(position, value) {
                 //display the new value on the screen
                 if (sliderID.indexOf("rain") != -1) {
                     this.output.html(value + "%");
                 } else {
                     this.output.html(value);
                 }
                 updatePref($(this.$element[0]).attr("data-item"), this.$element.val())
             }
         });
     }

 }

 function updatePref(clothingItem, value) {
     //go through the clothing objects array and update the preference for the matching item
     for (var i = 0; i < clothingObjects.length; i++) {
         if (clothingObjects[i].name.indexOf(clothingItem) != -1) {
             // console.log('clothingObject found at pos: ', i)
             clothingObjects[i].pref = parseInt(value);
              clothingObjects[i].hasPref = true;              
         }
     }
 }

 function getPref(clothingItem) {
     console.log('getPref', 'clothingItem:', clothingItem)
     //go through the clothing objects array and update the preference for the matching item
     for (var i = 0; i < clothingObjects.length; i++) {
         if (clothingObjects[i].name.indexOf(clothingItem) != -1) {
             // console.log('clothingObject found at pos: ', i)
             //console.log('return', 'clothingObjects...ref:', clothingObjects[i].pref)
             return clothingObjects[i].pref;
         }
     }
 }


  // Client ID and API key from the Developer Console
   var CLIENT_ID = '1027881161846-37hl8uvkg7d389d0dj4a86m0iuskimpc.apps.googleusercontent.com';

   // Array of API discovery doc URLs for APIs used by the quickstart
   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

   // Authorization scopes required by the API; multiple scopes can be
   // included, separated by spaces.
   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

   var authorizeButton = document.getElementById('authorize-button');
   var signoutButton = document.getElementById('signout-button');
   var eventWeatherList =[];

   /**
    *  On load, called to load the auth2 library and API client library.
    */
   function handleClientLoad() {
     gapi.load('client:auth2', initClient);
   }

   /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
   function initClient() {
     gapi.client.init({
       discoveryDocs: DISCOVERY_DOCS,
       clientId: CLIENT_ID,
       scope: SCOPES
     }).then(function () {
       // Listen for sign-in state changes.
       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

       // Handle the initial sign-in state.
       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
       authorizeButton.onclick = handleAuthClick;
       signoutButton.onclick = handleSignoutClick;
     });
   }

   /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
   function updateSigninStatus(isSignedIn) {
     console.log('updateSigninStatus', 'isSignedIn:', isSignedIn)

     if (isSignedIn) {
       authorizeButton.style.display = 'none';
       signoutButton.style.display = 'block';

       //hide step1 Buttons
         $("#authorize-button").hide();
         hideStepButtons(1);
         //show step2 Buttons
         showStepButtons(2);
         //change progress bar
         renderProgressBar(2)

         //show the initial list of clothing items
         renderClothingItems();

         //change the subheading
         $("#step-subheading").text(headingStep2);

       listUpcomingEvents();
     } else {
       authorizeButton.style.display = 'block';
       signoutButton.style.display = 'none';
       renderStep1();
               //hide step1 Buttons
         hideStepButtons(2)
     }
   }

   /**
    *  Sign in the user upon button click.
    */
   function handleAuthClick(event) {
     gapi.auth2.getAuthInstance().signIn();
   }

   /**
    *  Sign out the user upon button click.
    */
   function handleSignoutClick(event) {
     gapi.auth2.getAuthInstance().signOut();
   }


   /**
    * Print the summary and start datetime/date of the next ten events in
    * the authorized user's calendar. If no events are found an
    * appropriate message is printed.
    */
   function listUpcomingEvents() {
     gapi.client.calendar.events.list({
       'calendarId': 'primary',
       'timeMin': (new Date()).toISOString(),
       'showDeleted': false,
       'singleEvents': true,
       'maxResults': 50,
       'orderBy': 'startTime'
     }).then(function(response) {
       var events = response.result.items;
       storeUserEmail(events[0].creator.email);
       makeEventObject(events);
   });


   //--------------------------------------
   //EVENTS:  Create Global Variables
   //--------------------------------------

   //Create array of objects containing event info from google calendar. 
   var eventCalendarList = [];
   var counter = 0;
   var eventWeatherList = [];
   var currentUserEmail ;
   
   function storeUserEmail(email) {
      var database = firebase.database();
       var usersList = database.ref("/users").push({
           email: email,
           timeStamp: firebase.database.ServerValue.TIMESTAMP,
       });
    }
     

   //Function that will get info from google calendar then send that info to dark sky.
   function makeEventObject(events) {

      var email;
      var address;
      var startTime;
      var endTime;
      var description;
      var brollyEvent;
      var eventName;

     for(var i = 0; i < events.length; i++) {
        
       // create variables that will go into our object.
       email = events[i].creator.email;
       address = events[i].location;
       description = events[i].summary;
       brollyEvent = events[i].description;
       eventName = events[i].summary;

       startDateTime = moment(events[i].start.dateTime).format("DD:MM:YYYY hh:mm");
       startDate = startDateTime.split(" ")[0];
       startTime = startDateTime.split(" ")[1];
       startTimeIndex = startTime.split(":")[0];
       if (startTimeIndex[0] == 0) {
         startTimeIndex = startTimeIndex[1];
       };

       endDateTime = moment(events[i].end.dateTime).format("DD:MM:YYYY hh:mm");
       endDate = endDateTime.split(" ")[0];
       endTime = endDateTime.split(" ")[1];
       endTimeIndex = endTime.split(":")[0];

        var calendarEventObject = {};

        // Fill our object with previous variables created
        calendarEventObject.email = email;
        calendarEventObject.location = address;
        calendarEventObject.startTime = startTime;
        calendarEventObject.startDate = startDate;
        calendarEventObject.endTime = endTime;
        calendarEventObject.endDate = endDate;
        calendarEventObject.startTimeIndex = startTimeIndex;
        calendarEventObject.endTimeIndex = endTimeIndex;
        calendarEventObject.eventName = eventName;


        // Put our objects into the array
        eventCalendarList.push(calendarEventObject);

        // Create an event #Brolly for important events. 
        if(brollyEvent === "#Brolly" ) {

          calendarEventObject["Event"] = brollyEvent;

          eventCalendarList.push(calendarEventObject);

         }   
       getLatLong(address);
       
       }
   }

   function getLatLong(address){
     query = address;

     geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'address': query }, function(results, status) {
         addresses = {};
         $.each(results, function(index, value){
           var cordinates ={"lat":value.geometry.location.lat(),"lng":value.geometry.location.lng()};
           var lt = cordinates.lat;
           var lng = cordinates.lng;
           getWeatherData(lt, lng);
         })
     });
   }

   var getWeatherData = function(lt, lng) {
     // Dark Sky.....
       var APIKey = "1b5f903fa9883c2fbaa84362f01855a4";
       var lat = lt;
       var long = lng;
       // Here we are building the URL we need to query the database
       var queryURL = "https://api.darksky.net/forecast/" + APIKey + "/" + lat + "," + long;
       // Here we run our AJAX call to the dark sky API
       $.ajax({
               url: queryURL,
               method: "GET",
               dataType: "jsonp"
           })
           // We store all of the retrieved data inside of an object called "response"
           .done(function(response) {

             counter ++;

             // Log the queryURL
             // console.log(queryURL);

             var hourlyData = response.hourly.data;
             var currentEvent = eventCalendarList[counter];
             // console.log('currentEvent', currentEvent)
             var index = currentEvent.startTimeIndex;
             var appTemp = (hourlyData[index].apparentTemperature);
             var precProb = (hourlyData[index].precipProbability);
             var precInt = (hourlyData[index].precipIntensity);
             var uvIndex = (hourlyData[index].uvIndex);
             var cloudCover = (hourlyData[index].cloudCover);

             var weatherObject = {};

             weatherObject.userName = currentEvent.email;
             weatherObject.eventName = currentEvent.eventName;
             weatherObject.location = currentEvent.location;
             weatherObject.startTime = currentEvent.startTime;
             weatherObject.startDate = currentEvent.startDate;
             weatherObject.appTemp = appTemp;
             weatherObject.precProb = precProb;
             weatherObject.precInt = precInt;
             weatherObject.uvIndex = uvIndex;
             weatherObject.cloudCover = cloudCover;

             eventWeatherList.push(weatherObject);
             return eventWeatherList;
       });
   }


 //--------->Logic comparing weather events to user prefrences<--------------------------\\


 function compareUserPref(eventWeatherList){

   for (var j = 0; j < eventWeatherList.length; j++) {

     var currentWeatherData = eventWeatherList[j];
     console.log('currentWeatherData', currentWeatherData)
     var temp = currentWeatherData.appTemp;
     var rainProb = currentWeatherData.precProb;
     var uv = currentWeatherData.uvIndex;
     var eventName = currentWeatherData.eventName;
     var eventTime = currentWeatherData.startTime;

     var eventClothingItems = [];
     // console.log('eventClothingItems', eventClothingItems)

    for (i=0; i<clothingObjects.length; i++) {
      console.log(clothingObjects);

      if (clothingObjects[i].hasPref == true) {
        // console.log(clothingObjects[i]);
       var prefence = clothingObjects[i].pref;
       // console.log('prefence', prefence)
       var weatherType = clothingObjects[i].weatherType;
       var clothingItem = clothingObjects[i].name; 

        // if (prefence !== undefined) {
         if (weatherType === 'sun') {
           if (uv >= parseInt(prefence)) {
             if (clothingItem === 'sunscreen') {
               eventClothingItems.push(clothingItem);
               clothingObjects[i].today = true;
               
             }
             else if (clothingItem === 'hat') {
               eventClothingItems.push(clothingItem);
               clothingObjects[i].today = true;
             }
             else if (clothingItem === 'glasses') {
               eventClothingItems.push(clothingItem);
               clothingObjects[i].today = true;
             }
           }
         }
         if (weatherType === 'rain') {
           if (rainProb > parseInt(prefence/100)) {
            if (clothingItem === 'umbrella') {
              eventClothingItems.push(clothingItem);
              clothingObjects[i].today = true;
            }
            else if (clothingItem === 'rain-jacket') {
              eventClothingItems.push(clothingItem);
              clothingObjects[i].today = true;
            } 
           }
         }
         if (weatherType === 'temp') {
           if (temp < parseInt(prefence)) {
             eventClothingItems.push(clothingItem);
             clothingObjects[i].today = true;
           }
         }
      } 
   
     }

     console.log('renderEventClot...ems', 'eventName:', eventName, 'eventTime:', eventTime, 'eventClothingItems:', eventClothingItems)
     renderEventClothingItems(eventName, eventTime, eventClothingItems);

     //display icons for clothing required today
    

   }

 }

 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDKNyh69deziNpJxi-XRro_OmuImyFj154",
     authDomain: "brolly-184217.firebaseapp.com",
     databaseURL: "https://brolly-184217.firebaseio.com",
     projectId: "brolly-184217",
     storageBucket: "brolly-184217.appspot.com",
     messagingSenderId: "240354309598"
 };
 firebase.initializeApp(config);




 //----------------------------------
 // on Document Load
 //----------------------------------

 //wait for the document to load before executing below
 $(document).ready(function() {

     //----------------------------------
     // on click listners
     //----------------------------------


     //listener for clothing icons to add checkmarks
     $(document).on("click", ".imgCheckbox1 img", function() {
         console.log($(this));

         var selected = $(this).parent().hasClass("imgChked");

         //allow the user to select the item and add a check mark
         if (!selected) {
             $(this).parent().addClass("imgChked");
         }
         //unselect the item
         else {
             $(this).parent().removeClass("imgChked");
         }
     });

     $(document).on("click", "#step1-next", function() {

         //hide step1 Buttons
         $("#authorize-button").hide();
         hideStepButtons(1);
         //show step2 Buttons
         showStepButtons(2);
         //change progress bar
         renderProgressBar(2)

         //show the initial list of clothing items
         renderClothingItems();

         //change the subheading
         $("#step-subheading").text(headingStep2);
     });


     $(document).on("click", "#step2-previous", function() {
         //hide step1 Buttons
         hideStepButtons(2);
         //show step1 Buttons
         renderStep1();
     });


     //listen for click on Step 2 next button
     // -> takes user to Step 3
     $(document).on("click", "#step2-next", function() {

         //create an jquery object of selected clothing item elements
         selectedClothingItems = $(".imgCheckbox1.imgChked");
         if (selectedClothingItems.length > 0) {
             //hide warning text if its there
             $("#alert").empty();

             //hide step2 Buttons
             hideStepButtons(2);
             //show step3 Buttons
             showStepButtons(3);
             //change progress bar
             renderProgressBar(3)

             //change the subheading
             $("#step-subheading").text(headingStep3);


             //display the selected items on the page
             renderSelectedItems();
         } else {
             $("#alert").empty().append("Please Select at least one item");
         }



     });

     //listener for click on Step 3 previous button
     // -> takes user to Step 2
     $(document).on("click", "#step3-previous", function() {
         //hide step2 Buttons
         hideStepButtons(3);
         //show step3 Buttons
         showStepButtons(2);
         //change progress bar
         renderProgressBar(2)


         //show the initial list of clothing items
         renderClothingItems();

         //change the subheading
         $("#step-subheading").text(headingStep2);

     });


     $(document).on("click", "#step3-next", function() {
         //hide step3 Buttons
         hideStepButtons(3);
         //show step4 Buttons
         showStepButtons(4);
         //change progress bar
         renderProgressBar(4)

         //save the user preferences



         $("#step-subheading").text(headingStep4);

         $("#clothing-items-container").empty().text("Insert Alert Settings. E.g. Receive Alert 2 hours before event (x)");
     });

     $(document).on("click", "#step4-previous", function() {
         //hide step4 Buttons
         hideStepButtons(4);
         //show step3 Buttons
         showStepButtons(3);
         //change progress bar
         renderProgressBar(3)

         //remove the contents of the main container
         $("#clothing-items-container").empty()
         //change subheading
         $("#step-subheading").text(headingStep3);

         //show the items the user slected
         renderSelectedItems();

     });

     $(document).on("click", "#step4-next", function() {
         //hide step4 Buttons
         hideStepButtons(4);

         $("#progress-bar").empty();

         $("#step-subheading").text("Todays Recomendations");

         $("#clothing-items-container").empty();
         compareUserPref(eventWeatherList);
          renderTodaysClothingItems();

     });

 });

 }

