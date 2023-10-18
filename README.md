# CASA-Cookies
CASA Cookies project, demonstrating cookie-banner functionality.

## How to Run
Pull the repo, call `npm i` and then `npm start`. In your browser open `localhost:3000/start`.
There are 2 branches, `main` and `second-approach`. 

## TLDR: Outline of the Approach
No client-side JS is used at all, instead: 
- Clicking buttons does a `GET` request to the request handler
- Cookies are set inside the request handler
- The variables that are passed to nunjucks for conditional rendering are computed inside the request handler
- This approach completely gets rid of the necessity for client side JS

## How to Implement 
- Add `app/views/partials/gtm-body.njk` and `app/views/partials/gtm-head.njk`. Replace the code with the code probvided by Google Tag Manager for your project. 
- Add `app/views/partials/cookie-banner.njk`. This can be copy and pasted. 
- For every layout nunjucks file, add: 
  - `{% include "partials/gtm-head.njk" %}` to the `head` block 
  - `{% include "partials/gtm-body.njk" %}` to the `bodyStart` block
  - `{% include "partials/cookie-banner.njk" %}` to the `bodyStart` block 
- Copy the `app/middleware/cookies.ts` file 
- For every CASA (sub)app that you have, import the `app/middleware/cookies.ts` file and use it with `ancillaryRouter.prependUse(cookiesMiddleware);` (see `app/app.ts` lines 7 and 56)
