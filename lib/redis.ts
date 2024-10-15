import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("UPSTASH_REDIS_REST_TOKEN is not defined");
}

const redis = (() => {
  try {
    return new Redis({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch {
    return {
      hgetall: async () => ({}),
      get: async () => null,
      set: async () => {},
      hincrby: async () => 0,
      hget: async () => null,
    };
  }
})();

export default redis;
