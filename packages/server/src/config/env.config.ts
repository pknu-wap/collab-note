export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8080,
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  //TODO: 수정 필요
  ALLOWLIST:
    process.env.NODE_ENV === 'production' ? /wap-dev.store/ : /localhost/,
});
