import React from "react";
import { useNavigate } from "react-router-dom";

const CardArticle = ({ article }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const encodedId = encodeURIComponent(article._id);
    navigate(`/article/${encodedId}`);
  };
  return (
    <div  className="bg-[#814734] shadow-lg rounded-lg p-2 ">
      <div className="px-6 py-5">
        <div className="flex items-start">
          <div className="flex-grow truncate">
            <div className="w-full sm:flex justify-between items-center mb-3">
              <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                {article.headline.main}
              </h2>
            </div>
            <div className="flex items-end justify-between whitespace-normal">
              <div className="max-w-md text-indigo-100">
                <p className="mb-2">{article.snippet}</p>
              </div>
              <a
                className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none"
                onClick={handleCardClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="block font-bold">{"->"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
