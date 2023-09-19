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
    console.log('cookieChoiceMade:', cookieChoiceMade);
    res.locals.showBanner = cookieChoiceMade === undefined;

    const hideCookieMessage = req.cookies['hideCookies'];
    console.log('hideCookies: ', hideCookieMessage);
    res.locals.showSecondBanner = cookieChoiceMade !== undefined && hideCookieMessage === undefined;
    
    if(cookieChoiceMade === 'accept') {
      res.locals.allowCookies = true;
    }

    if(cookieChoiceMade === 'reject') {
      res.locals.allowCookies = false;
    }

    next();
  })

  return mount(casaApp, {});
}

export default app;
