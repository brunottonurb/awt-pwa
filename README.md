# Prototype Progressive Web App using Shaka Player to save Videos for Offline Viewing

Watch streaming videos or save them in your browsers IndexedDB for offline viewing.

<hr>

1. You need to have Node.js installed.
2. When inside this directory (awt-pwa) run `npm install`.
3. Start the dev server with `npm start`.
4. Navigate to `http://localhost:3000` in your browser.

<hr>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Builds the app and deploys to github-pages.

<hr>

## Known Issues

1. IOS - on IOS 13 (Beta) on mini Ipad : Available storage space is listed as 100mb but is not accurate and is not updated, user can store more. and used space is always 0.
2. IOS - The 4th video "Another Stream" does not work on IOS for some reason.. might be the video format.
3. Shaka Player - If the audio language and the subtitle language are the same, Shaka Player automatically does not show the subtitles.. did not find an option to force it.
4. Storage - If there is not enough available storage space to download a certain video, it will begin downloading anyway until the storage is full, afterwhich it will simply stop without freeing the uses storage.
5. Storage - Available storage space seems to differ even with the same browser type, OS and device, no clear reason as to why. 
6. Storage - Available storage space is not updated instantly after deleting a video, remains saved in cache. 