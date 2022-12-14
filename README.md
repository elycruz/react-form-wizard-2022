# react-form-wizard-2022 (work-in-progress)

A form wizard (survey form, intake form, etc.) application showcasing the use of nextjs v13+ and react v18+.

## Running the app

- Run it with, or add environment variable to '.env' file, `LMDB_STORE_PATH` (path should be a directory).

### Pre-requisites

NodeJs >= v19. 

## Application Todos

- [x] Standalone Name, Contact, Address, and Other fieldset field collections.
- [x] ~~Login~~ "Start form" page.
- [x] "Contact Info" page.
- [x] "Name" page.
- [x] "Address" page.
- [x] "Other" page.
- [x] ~~"Submissions"~~ Index page - Will contain submitted forms. 
  - [x] Change 'server store' to redux.
  - [ ] Server side redux support - Requires `next-redux-wrapper` package.
- [x] Application "storybook".  
- [x] "Prev" and "Next" form-submit buttons.
- [x] "Save" form-submit button.
- [x] Forms showing "required", and "not required" form fields.
- [x] "No JS" (MVP) version of app (using Next.js SSR, and business logic).
- [x] ~~"In Memory"~~ "Persistent" data storage - performed via 'lmdb' module.
- [x] CSRF protection - ~~(placeholders added)~~ Basic (example) protection added, using 'uuidv4' tokens.
- [x] MVP Table control.
- [x] ~~MVP Pagination control.~~
- [ ] "Submit entry" button.
- [ ] "Percentages completed" list/menu - Nav control depicting how much of each form is completed.
- [ ] ~~Add styling library, or add additional base styling, to the app.~~
- [ ] @todo et al.

### Form Wizard Table

Basic table control.

#### Spec

Control should:

- Optionally render an "index" column - Column showing the index number of every given row, along with users selected index column header.
- Show an "No entries found" (can be extended to be customizable) message when no columns, and/or, data is available (in a real app there should be a message for 'no columns', and 'no data', '... found' cases).

### F

*create-react-app* "README" follows. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
