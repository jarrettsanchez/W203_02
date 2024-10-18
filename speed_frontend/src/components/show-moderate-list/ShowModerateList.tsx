"use client";

import { Article } from "../Article";
import { useState, useEffect } from "react";
import axios from "axios";
import ModerateArticleCard from "./ModerateArticleCard";

function ShowModerateList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/`)
      .then((response) => {
        // Filter articles with moderation_flag set to false
        const filteredArticles = response.data.filter(
          (article: Article) => !article.moderation_flag
        );
        setArticles(filteredArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const articleList =
    articles.length === 0
      ? "There are no articles pending moderation!"
      : articles.map((article, k) => (
          <ModerateArticleCard article={article} key={k} />
        ));

  return (
    <div className="ShowModerateArticleList">
      <div className="container">
        <h2 className="text-header">Articles Pending Moderation</h2>
        <br />
      </div>

      <div className="list">{articleList}</div>
    </div>
  );
}

export default ShowModerateList;
