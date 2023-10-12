# meet

Live demo : https://stivi00.github.io/meet/

## Feature 1: Filter Events by City
- Given:The user has opened the app
- When: The user selects city from offered cities
- Then: App will display events located in the selected city

## Feature 2: Show/Hide Ecent Details
- Given: The user is on the event details page
- When: The user either taps a toggle button or executes a particular gesture
- Then: Event details section rerenders, showing extra information or hiding them

## Feature 3: Specify Number of Events
- Given:  The user is currently browsing the events listing page
- When: the user enters a numerical value or chooses a option from a dropdown menu to define the desired quantity of events to view
- Then: The events listing page updates, presenting the designated number of events

## Feature 4: Use the App when offline

- Given: The user has previously launched the event application and is currently connected to the internet
- When: The user's internet connection is lost or when they activate airplane mode
- Then: The event application shows a notification, displaying that the user is now offline and that certain functions may have restrictions or may not be accessible ( events viewed before and cached data remain accessible)

## Feature 5: Add an App Shortcut to the Home Screen

- Given: The user has installed the event application on their device
- When: The user performs a long-press on the app icon or navigates to the app settings
- Then: The user is given the choice to create a shortcut on their home screen. If confirmed, the app icon becomes visible on the home screen

## Feature 6: Display Charts Visualizing Event Details

- Given: The user is currently browsing the event details page
- When: The user selects the "View Charts" or accesses a particular tab within the event details page
- Then: The application fetches data and creates visually engaging charts, showcasing them to the user within the event details page. This serves to offer insights and event-related statistics
