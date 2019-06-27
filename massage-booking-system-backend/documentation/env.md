### Documentation for environment variables
* PORT: Defines the port on which the backend is started
* MONGODB_URI: Defines the MongoDB URI where all the production data is stored

* TEST_MONGODB_URI: Defines the MongoDB URI for all the tests
* SECRET: Defines the secret that is used to salt the tokens

#### Google Auth variables
* CLIENT_ID: Client ID used for Google authentication 
* CLIENT_SECRET: Client Secret used for Google authentication

* COOKIE_KEY: Cookie Key used for Google authentication 

#### User management
* EMAIL_SUFFIX: Defines a suffix (e.g. gmail.com) that's whitelisted so that all users from this domain can register to the massage booking system
* INITIAL_ADMIN: Accepts an email address (e.g. user@domain.com) that's given admin rights during registration process

* EMAIL_WHITELIST: Accepts a list of emails separated by "," that are whitelisted so their email suffixes don't have to end in suffix specified by EMAIL_SUFFIX variable
