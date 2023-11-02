import { Request, Response, NextFunction } from 'express';

export default function cookiesMiddleware(req: Request, res: Response, next: NextFunction) {
  const cookieChoiceMade = req.cookies['cookieChoiceMade'];
  const cookies = req.body.cookies;
  res.locals.showCookiesBanner = cookieChoiceMade === undefined && cookies === undefined;

  if(cookieChoiceMade === undefined && cookies) {
    res.cookie('cookieChoiceMade', cookies);
  }

  res.locals.allowCookies = cookieChoiceMade === 'accept' || cookies === 'accept';

  const hideCookieMessage = req.cookies['hideCookies'];
  const hideCookies = req.body.hideCookies;
  res.locals.showHideCookieMessageBanner = !res.locals.showCookiesBanner && 
    hideCookieMessage === undefined && hideCookies === undefined;
  if(hideCookieMessage === undefined && hideCookies) {
    res.cookie('hideCookies', hideCookies);
  }

  if(cookies === undefined && hideCookies === undefined) {
    next();
    return;
  }

  if(req.method === 'POST') {
    res.redirect(req.originalUrl);
  } else {
    next();
  }
}