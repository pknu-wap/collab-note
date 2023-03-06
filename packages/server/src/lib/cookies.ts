import { Response } from 'express';

const domains =
  process.env.NODE_ENV === 'production' ? ['.wap-dev.store'] : [undefined];

export const setTokenCookie = (res: Response, token: string) => {
  // httpOnly: 브라우저에서 접근 금지
  // secure: https에서만 쿠키 전송
  // domain: 쿠키를 전송할 도메인
  const maxAge = 1000 * 60 * 60 * 24 * 1; // 1d
  const secure = process.env.NODE_ENV === 'production';

  domains.forEach((domain) => {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure,
      path: '/',
      maxAge,
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
  });
};
