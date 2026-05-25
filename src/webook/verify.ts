import {Request} from 'express'
import { config } from "../config";
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWebHook(req: Request & { rawBody?: Buffer}) {
  const signature = req.headers["x-hub-signature-256"] as string;
  if (!signature) throw new Error("No signature header");

  const hmac = createHmac("sha256", config.webhookSecret);
  hmac.update(req.rawBody!);
  const digest = "sha256=" + hmac.digest("hex");

  // timingSafeEqual prevents timing attacks — never use === here
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(digest)))
    throw new Error("Invalid webhook signature");
}