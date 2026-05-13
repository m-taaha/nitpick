import dotenv from "dotenv";

dotenv.config();

const required = (key: string) => {
    const value = process.env[key];
    if(!value) {
        throw new Error(`Missing env var: ${key}`);
    }
    return value;
}


export const config = {
  port: Number(process.env.PORT) || 8000,
  appId: required("GITHUB_APP_ID"),
  webhookSecret: required("WEBHOOK_SECRET"),
  privateKey: required("GITHUB_PRIVATE_KEY").replace(/\\n/g, "\n")
};