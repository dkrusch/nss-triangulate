## What is Triangulate?

Basically, it allows a user to enter in or select different lat/long coordinates with which a geographical central coordinate will be presented for the user. So if a group of people want to meet at a truly central location, this app allows them to do that.

This is the home page: 

![alt text](https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate1.png "Logo Title Text 1")


A user may select or enter coordinates using these inputs: 

![alt text][logo]

[logo]: https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate2.png "Logo Title Text 2"


When submitted the locations show up on the map as markers: 

![alt text](https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate3.png "Logo Title Text 1")


You can find the center by clicking the "Calculate Center" button on the right, the center coordinate shows up as a blue marker: 

![alt text](https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate4.png "Logo Title Text 1")


If you don't have any saved locations you can enter them manually in the input fields: 

![alt text](https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate5.png "Logo Title Text 1")


This page allows you to add locations to the dropdowns as well as friends who have their own save locations: 

![alt text](https://github.com/dkrusch/nss-triangulate/raw/master/images/triangulate6.png "Logo Title Text 1")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Necessary Steps To Run Triangulate

First you will need your own google-maps api key. To do this visit this site https://developers.google.com/maps/documentation/javascript/get-api-key and follow the instructions.

Once you have your api key, in the root project folder of the clone of this repository create a .env file, then inside that file type the text inside the qoutes: "REACT_APP_GOOGLE_MAP_KEY=your api key here"

In the console please run: 

### `npm install --save google-maps-react`

As well as: 

### `npm install mathjs`

Then in a new console window, navigate to the api folder within the directory and run: 

### `json-server -p 5002 -w database.json`

Then in a new console window run: 

### `npm start`

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
