import { Request, Response, NextFunction } from 'express';
import { redis } from '../app';

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  const logData = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    query: req.query,
    body: req.method === 'POST' ? { ...req.body } : {} // Be careful with sensitive data
  };

  // Remove sensitive data from logs
  if (logData.body.password) delete logData.body.password;
  if (logData.body.privateKey) delete logData.body.privateKey;
  if (logData.body.token) delete logData.body.token;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = {
      ...logData,
      statusCode: res.statusCode,
      duration,
      contentLength: res.get('content-length')
    };

    // Log to console
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);

    // Store in Redis for real-time monitoring (optional)
    redis.lpush('api_logs', JSON.stringify(logEntry)).catch(console.error);
    redis.ltrim('api_logs', 0, 9999).catch(console.error); // Keep last 10,000 logs
  });

  next();
};