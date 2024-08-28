import React, { useState, useEffect } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import CardArticle from "./../components/CardArticle"; 

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      setArticles([]);
      return;
    }

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=aqQIhWV8c5sGv9aeGovhSo6h3wG51iJb`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response && data.response.docs) {
          if (data.response.docs.length === 0) {
            setError("No articles found.");
            if (page > 1) {
              setPage(page - 1); // Go back to the previous page if no articles are found
            }
          } else {
            setArticles(data.response.docs);
            setError("");
          }
        } else {
          setArticles([]);
          setError("Failed to fetch articles.");
        }
      } catch (error) {
        setArticles([]);
        setError(`Failed to fetch articles: ${error.message}`);
      }
    };

    fetchArticles();
  }, [query, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && articles.length > 0) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col mt-[90px]">
      <h1 className="flex justify-center text-[50px] text-[#814734]">Home</h1>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-center mt-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg w-1/2"
            placeholder="Search for articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-8">
          {error && <div className="text-red-500">{error}</div>}
          {articles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {articles.map((article) => (
                <CardArticle key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div>No articles to display.</div>
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="fixed bottom-0 rounded-lg left-1/2 transform -translate-x-1/2 z-10 bg-[linen] flex justify-center p-4 w-[15%]">
      <button
          onClick={() => handlePageChange(page - 1)}
          className="btn btn-secondary mx-2"
          disabled={page <= 1 || articles.length === 0}
        >
          <FaAngleDoubleLeft />
        </button>
        <span className="mx-2">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="btn btn-secondary mx-2"
          disabled={articles.length === 0}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
