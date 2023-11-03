import { createClient } from "microcms-js-sdk";
import { env } from "@/env.mjs";

export const microCmsClient = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});
