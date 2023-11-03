import { Article } from "@/lib/article";

interface ArticleDetailProps {
  article: Article;
}

export default async function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}
