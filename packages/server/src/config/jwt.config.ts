export default () => ({
  ACCESS_TOKEN: {
    SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
    DURATION: process.env.ACCESS_TOKEN_DURATION || '1h',
  },
  REFRESH_TOKEN: {
    SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret',
    DURATION: process.env.REFRESH_TOKEN_DURATION || '30d',
  },
});
