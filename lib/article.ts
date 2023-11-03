import { Metadata } from "next";
import { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";
import { microCmsClient } from "./micro-cms";

const endpoint = "article";

export interface Article extends MicroCMSListContent {
  title: string;
  body: string;
}

export async function getArticles(queries?: MicroCMSQueries) {
  return await microCmsClient
    .getList<Article>({
      endpoint,
      queries: {
        fields: ["title"],
        limit: 100,
        ...queries,
      },
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
}

export async function getArticle(contentId: string, queries?: MicroCMSQueries) {
  return await microCmsClient
    .get<Article>({
      endpoint,
      contentId,
      queries,
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
}

export async function getArticleDraft(
  contentId: string,
  queries: MicroCMSQueries & { draftKey: string }
) {
  return await microCmsClient
    .get<Article>({
      endpoint: "article",
      contentId,
      queries,
      // draftKeyが不変でも内容は変わるためキャッシュを無視
      customRequestInit: { cache: "no-store" },
    })
    .catch(() => {
      return null;
    });
}

/** 記事ページのメタデータを生成 */
export async function generateArticleMetadata(
  articleId: string,
  draftKey?: string | string[]
): Promise<Metadata | void> {
  let article: Article | null = null;
  const isDraft = typeof draftKey === "string";
  if (isDraft) {
    article = await getArticleDraft(articleId, { draftKey });
  } else {
    article = await getArticle(articleId);
  }
  if (article) {
    const { title } = article;
    return { title: isDraft ? `[プレビュー] ${title}` : title };
  }
}
