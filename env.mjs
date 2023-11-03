import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // サーバーサイド専用の環境変数のスキーマはここに定義
    /** microCMSのサービスドメイン */
    MICROCMS_SERVICE_DOMAIN: z.string(),
    /** microCMSのAPIキー */
    MICROCMS_API_KEY: z.string(),
  },
  client: {
    // クライアントサイド用の環境変数のスキーマはここに定義
    /** 1ページあたりの記事数 */
    NEXT_PUBLIC_PAGINATION_PER_PAGE: z.string(),
  },

  runtimeEnv: {
    // ここで実際の環境変数とマッピングを行う
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    NEXT_PUBLIC_PAGINATION_PER_PAGE: process.env.NEXT_PUBLIC_PAGINATION_PER_PAGE,
  },
});
