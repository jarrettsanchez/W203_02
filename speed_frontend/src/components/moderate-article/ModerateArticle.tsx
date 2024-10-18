"use client";

import { Article, DefaultEmptyArticle } from "@/components/Article";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

function ModerateArticle() {
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleRelevancyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, se_relevancy: event.target.value === "true" });
  };

  const handlePeerReviewedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, peer_reviewed: event.target.value === "true" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((res) => {
        router.push(`/show-moderation/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ModerateArticle">
      <div className="container">
        <h3>Moderating the article: {article.title}</h3>
        <div className="col-md-8">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <b>
                <label htmlFor="relevancy">
                  Is the article relevant to Software Engineering? :
                </label>
              </b>
              <input
                type="radio"
                name="relevancy"
                id="relevancyChoice1"
                value="true"
                checked={article.se_relevancy === true}
                onChange={handleRelevancyChange}
                className="ml-2"
              />
              <label htmlFor="relevancyChoice1" className="ml-2">
                True
              </label>

              <input
                type="radio"
                name="relevancy"
                id="relevancyChoice2"
                value="false"
                checked={article.se_relevancy === false}
                onChange={handleRelevancyChange}
                className="ml-4"
              />
              <label htmlFor="relevancyChoice2" className="ml-2">
                False
              </label>
            </div>

            <div className="form-group mb-2">
              <b>
                <label htmlFor="published">
                  Is the article published in a peer reviewed
                  Journal/Conference? :
                </label>
              </b>
              <input
                type="radio"
                name="published"
                id="peerReviewedChoice1"
                value="true"
                checked={article.peer_reviewed === true}
                onChange={handlePeerReviewedChange}
                className="ml-2"
              />
              <label htmlFor="peerReviewedChoice1" className="ml-2">
                True
              </label>

              <input
                type="radio"
                name="published"
                id="peerReviewedChoice2"
                value="false"
                checked={article.peer_reviewed === false}
                onChange={handlePeerReviewedChange}
                className="ml-4"
              />
              <label htmlFor="peerReviewedChoice2" className="ml-2">
                False
              </label>
            </div>

            <div className="form-group mb-2">
              <b>
                <label htmlFor="category">
                  What SE category does this article go under?
                </label>
              </b>
              <input
                type="text"
                list="categories"
                name="se_category"
                className="form-control"
                value={article.se_category}
                onChange={inputOnChange}
              />
              <datalist id="categories">
                <option>Test Driven Development</option>
                <option>Mob Programming</option>
                <option>Unit Testing</option>
                <option>Code Review</option>
              </datalist>
            </div>

            <button type="submit">
              <FaCheck /> Save
            </button>
            <button type="button" onClick={() => router.back()}>
              <FaTimes /> Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModerateArticle;
