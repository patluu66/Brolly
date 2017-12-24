![Brolly Web App Logo](https://cmatson93.github.io/Brolly-WebApp/images/brolly_icon_black.png "Brolly Logo")

#### Clothing recommendations matched to your schedule and the hyper local weather conditions

## Introduction:
Brolly was created to solve a problem that one of our team members had. His wife asked if she would need to wear a sweater for an evening meeting she had in San Francisco. Not knowing exactly where the meeting was, what the weather was going to be and at what temperature she would want to wear a sweater an idea was born.

**What if your google calendar events could be synced to a hyper local weather forecast and checked against your clothing preferences.**


The project was built as part of our Coding Bootcamp with a requirement to use front-end technologies and firebase. This limited the scope of what we were able to achieve with our application.

## Prerequisites:
1. A user must have a Google account to login.
2. A user must have events in their with a start time and a location


## How the Brolly App Works
1. The users logs in via GoogleoAuth to share their calendar with Brolly.
2. Events from the user calendar are then sent to Brolly.
3. Brolly temporarily stores the Event Name, location and time. 
4. Brolly geocodes the location and query's dark-sky.net API with the latitude and longitude
5. The weather for the time of the event is stored.
5. Ideally the last step would happen again at set intervals (i.e. daily) or at a set interval before each event (1 hour before event starts to get “hyperlocal next hour precipitation forecasts” from darksky.
6. These steps all happen as soon as the user logs in
7. Once logged in the user is directed to a clothing items page, from here they can select which clothing items they use (e.g. Rain Jacket or Umbrella)
8. After choosing the clothing items they are then given the option to choose weather preferences for each item (i.e. Below what temperature would they wear a sweater, or what probabily of rain would entice them to bring an umbrella).
9. Once items and preferences are selected the user is then shown a list of their events with the recommended item to bring for each event and a summary of the items required (as icons) that the user should bring for the day.


![Brolly Web App Logo](https://cmatson93.github.io/Brolly-WebApp/walkthrough.gif "Brolly Logo")


## Built With:
1. Darksky API - https://darksky.net/dev
2. Google Calendar API - https://developers.google.com/google-apps/calendar/quickstart/js


## Authors:
1. Christina Matson
2. William Brooks
2. Patrick Luu
3. Navid Yousefzai

## Acknowledgments:
Instructor: David Hallinan
TA: Abraham Ferguson, Marco Chan


