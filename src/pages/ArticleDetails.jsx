import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/shared/Loader";

const ArticleDetails = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:("${decodedId}")&api-key=aqQIhWV8c5sGv9aeGovhSo6h3wG51iJb`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response && data.response.docs && data.response.docs.length > 0) {
          setArticle(data.response.docs[0]);
        } else {
          setError("Article not found.");
        }
      } catch (error) {
        setError(`Failed to fetch article details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [decodedId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return article ? (
    <div className="flex flex-col items-center mt-[90px] p-4">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">{article.headline.main}</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          {article.byline.original || "Unknown Author"} | {new Date(article.pub_date).toLocaleDateString()}
        </p>
        {article.multimedia && article.multimedia.length > 0 && (
          <img
            src={`https://www.nytimes.com/${article.multimedia[0].url}`}
            alt={article.multimedia[0].caption || article.headline.main}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}
        <p className="text-lg text-gray-700 mb-4">{article.lead_paragraph}</p>
        <p className="text-gray-600">{article.abstract}</p>
        <div className="mt-6 text-center">
          <a
            href={article.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read the full article
          </a>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ArticleDetails;
