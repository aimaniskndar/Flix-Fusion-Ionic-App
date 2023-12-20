// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: 'YOUR_API_KEY', // The API key used for accessing The Movie Database API
  sessionId: 'YOUR_SESSION_ID', // This is the session ID to access the Watchlist and Favorites
  accountId: 'YOUR_ACCOUNT_ID', // This is where your account ID will be

  baseUrl: 'https://api.themoviedb.org/3', // The base URL for making API requests to The Movie Database
  images: 'https://image.tmdb.org/t/p' // The base URL for accessing movie and TV series images from The Movie Database
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
