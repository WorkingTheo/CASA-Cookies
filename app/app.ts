import path from 'path';
import helmet from 'helmet';
import { Store } from 'express-session';
import { configure, Plan } from "@dwp/govuk-casa";
import express, { NextFunction, Request, Response } from 'express';

const app = (
  name: string,
  secret: string,
  ttl: number,
  secure: boolean,
  sessionStore: Store,
) => {
  const casaApp = express();
  casaApp.use(helmet.noSniff());

  const viewDir = path.join(__dirname, './views/');
  const localesDir = path.join(__dirname, './locales/');

  const plan = new Plan();

  const { mount, ancillaryRouter } = configure({
    views: [viewDir],
    i18n: {
      dirs: [localesDir],
      locales: ['en'],
    },
    session: {
      name,
      secret,
      ttl,
      secure,
      store: sessionStore,
    },
    pages: [
      {
        waypoint: 'start',
        view: 'pages/start.njk'
      }
    ],
    plan
  });

  ancillaryRouter.use('/start', (req: Request, res: Response) => {
    if(req.method === 'POST') {
      console.log('POST');
      //console.log(req.body.cookies);
    } else {
      console.log('GET');
    }
    res.render('pages/start.njk');
  });

  ancillaryRouter.prependUse((req: Request, res: Response, next: NextFunction) => {
    const cookieChoiceMade = req.cookies['cookieChoiceMade'];
    const cookies = req.body.cookies;
    res.locals.showBanner = cookieChoiceMade === undefined && cookies === undefined;

    if(cookieChoiceMade === undefined && cookies) {
      res.cookie('cookieChoiceMade', cookies);
    }

    res.locals.allowCookies = cookieChoiceMade === 'accept' || cookies === 'accept';

    const hideCookieMessage = req.cookies['hideCookies'];
    const hideCookies = req.body.hideCookies;
    res.locals.showSecondBanner = !res.locals.showBanner && hideCookieMessage === undefined && hideCookies === undefined;
    if(hideCookieMessage === undefined && hideCookies) {
      res.cookie('hideCookies', hideCookies);
    }

    console.log(req.body);
    
    next();
  })

  return mount(casaApp, {});
}

export default app;
