import Redis from 'ioredis';

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  autoResubscribe: true,
  lazyConnect: true
};

// Create Redis client
export const redis = new Redis(redisConfig);

// Redis event handlers
redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('close', () => {
  console.log('Redis connection closed');
});

redis.on('reconnecting', () => {
  console.log('Redis reconnecting...');
});

// Redis utility functions
export const redisHelpers = {
  // Set value with expiration
  async setex(key: string, seconds: number, value: unknown): Promise<void> {
    await redis.setex(key, seconds, JSON.stringify(value));
  },

  // Get value
  async get(key: string): Promise<unknown> {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  // Delete key
  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    const result = await redis.exists(key);
    return result === 1;
  },

  // Get multiple keys
  async mget(keys: string[]): Promise<unknown[]> {
    const values = await redis.mget(...keys);
    return values.map(value => value ? JSON.parse(value) : null);
  },

  // Set multiple keys
  async mset(data: { [key: string]: unknown }): Promise<void> {
    const pipeline = redis.pipeline();
    Object.entries(data).forEach(([key, value]) => {
      pipeline.set(key, JSON.stringify(value));
    });
    await pipeline.exec();
  },

  // Increment counter
  async incr(key: string): Promise<number> {
    return await redis.incr(key);
  },

  // Increment by specific amount
  async incrby(key: string, increment: number): Promise<number> {
    return await redis.incrby(key, increment);
  },

  // Add to set
  async sadd(key: string, members: unknown[]): Promise<void> {
    const stringMembers = members.map(member => JSON.stringify(member));
    await redis.sadd(key, ...stringMembers);
  },

  // Get set members
  async smembers(key: string): Promise<unknown[]> {
    const members = await redis.smembers(key);
    return members.map(member => JSON.parse(member));
  },

  // Add to sorted set
  async zadd(key: string, score: number, member: unknown): Promise<void> {
    await redis.zadd(key, score, JSON.stringify(member));
  },

  // Get sorted set range
  async zrange(key: string, start: number, stop: number): Promise<unknown[]> {
    const members = await redis.zrange(key, start, stop);
    return members.map(member => JSON.parse(member));
  }
};