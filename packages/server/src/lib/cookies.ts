import { Response } from 'express';

// 나중에 수정할 것
const domains =
  process.env.NODE_ENV === 'production' ? ['.wap-dev.store'] : [undefined];

export const setTokenCookie = (res: Response, token: string) => {
  // httpOnly: 브라우저에서 접근 금지
  // secure: https에서만 쿠키 전송
  // domain: 쿠키를 전송할 도메인
  const secure = process.env.NODE_ENV === 'production';

  domains.forEach((domain) => {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure,
      path: '/',
      maxAge: 1000 * 60 * 60 * 1, // 1h
      domain,
    });
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
      domain,
    });
  });
};

export const clearTokenCookie = (res: Response) => {
  domains.forEach((domain) => {
    res.clearCookie('access_token', {
      path: '/',
      domain,
    });
    res.clearCookie('refresh_token', {
      path: '/',
      domain,
    });
  });
};
