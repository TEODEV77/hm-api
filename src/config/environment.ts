export const Environment = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mail_user : process.env.MAIL_USER,
  mail_pass : process.env.MAIL_PASS,
  mailer_host : process.env.MAILER_HOST,
  mailer_port : process.env.MAILER_PORT,
});
