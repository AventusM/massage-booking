![Massage Booking](https://fontmeme.com/permalink/190704/9556a11517af165e53fc4e33c5b421dd.png)

Application made for Unity Technologies Finland during a software development project at the University of Helsinki for making massage reservations at the Unity's Helsinki Office. This app was tailored for their use case and therefore makes assumptions about the massage hours and rules relating to the reservations.

## Technology Stack

The application was written using React/JavaScript in the frontend and Node.js/JavaScript in the backend while using REST APIs for communication between the app and the server. MongoDB was used as the database and Passport.js for authentication with Google.

## Key Features

* Google login
    * Avatar, name and email are fetched from Google account during first login
    * Backend supports limiting the allowed emails by email suffix.
* User management
    * User can remove their own account
    * User can setup their own phone number
* Intuitive interface for finding available appointment
* Making reservations during preset hours
    * User can join or cancel massage or stretching sessions
* Admin console
    * User management
    * Setting up streching sessions
    * Setting up announcement
    * Manage contents of the info page
    * Statistics
    * Appointment control
        * Disable/enable days
        * Account management
        * Cancelling appointments
* Info page
* TV view
* Appointments are generated automatically
* Optimized for both mobile and desktop

#### Current release
[Live on Heroku!](https://glacial-lowlands-81447.herokuapp.com/)
