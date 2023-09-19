# CASA-Cookies
CASA Cookies project, demonstrating cookie-banner functionality.

## How to Run
Pull the repo, call `npm i` and then `npm start`. In your browser open `localhost:3000/start`.
There are 2 branches, `main` and `second-approach`. 

The `main` branch employs the following approach: 
- `./app/assets/javascript/all.js` is run (see `./app/views/layouts/main.njk` line 8)
- The code in `all.js` initialises click handlers for the buttons (`accepts` and `reject` buttons in the first banner, and `hide message` for the second)
- When the user clicks a button, the choice they made is saved as a cookie, and the choice is also sent in a `POST` request 
- The `POST` request handler reads the user's choice from the cookies of the request and makes a variable available to nunjucks: 
  - namely `showBanner` and `showSecondBanner` (see `./app/app.ts` lines 57 and 61)
  - additionally, based on the user's choice, `allowCookies` is set to `true` or `false` (see `./app/app.ts` lines 64 and 68)
  - the GTM code is conditionally rendered based on the choice (see `.app/views/partials/gtm-body.njk` and `.app/views/partials/gtm-head.njk` line 1)

The `second-approach` branch employs a similar approach to the above, but with a slight difference: 
- The click handlers are in `script` tags and are added conditionally inside the `if` statements (see `.app/views/pages/start.njk`)
- This way the click handlers are only added when needed

