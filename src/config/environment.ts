export const Environment = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
});
