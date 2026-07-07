import dotenv from "dotenv";
import { Redis } from "ioredis";

dotenv.config();

const required = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT) || 8000,
  appId: required("GITHUB_APP_ID"),
  webhookSecret: required("WEBHOOK_SECRET"),
  privateKey: required("GITHUB_PRIVATE_KEY").replace(/\\n/g, "\n"),
};

export const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
  maxRetriesPerRequest: null, // required by BullMQ — don't remove this
});
