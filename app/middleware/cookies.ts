import { Request, Response, NextFunction } from 'express';

export default function cookiesMiddleware(req: Request, res: Response, next: NextFunction) {
  const cookieChoiceMade = req.cookies['cookieChoiceMade'];
  const cookies = req.query.cookies;
  res.locals.showBanner = cookieChoiceMade === undefined && cookies === undefined;

  if(cookieChoiceMade === undefined && cookies) {
    res.cookie('cookieChoiceMade', cookies);
  }

  res.locals.allowCookies = cookieChoiceMade === 'accept' || cookies === 'accept';

  const hideCookieMessage = req.cookies['hideCookies'];
  const hideCookies = req.query.hideCookies;
  res.locals.showSecondBanner = !res.locals.showBanner && hideCookieMessage === undefined && hideCookies === undefined;
  if(hideCookieMessage === undefined && hideCookies) {
    res.cookie('hideCookies', hideCookies);
  }
  
  next();
}