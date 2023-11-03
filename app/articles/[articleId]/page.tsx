import { notFound } from "next/navigation";
import { generateArticleMetadata, getArticle, getArticles } from "@/lib/article";
import ArticleDetail from "@/components/ArticleDetail";

// ここはお好みで
export const revalidate = 600;

type Props = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    ? articles.contents.map(({ id: articleId }) => ({
        articleId,
      }))
    : [];
}

export async function generateMetadata({ params: { articleId } }: Props) {
  return await generateArticleMetadata(articleId);
}

export default async function ArticlePage({ params: { articleId } }: Props) {
  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }
  return (
    <main>
      <ArticleDetail article={article} />
    </main>
  );
}
