import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "../Article";
import '@/app/globals.css';

const CreateArticleComponent = () => {
    const navigate = useRouter();

    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const [loading, setLoading] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, [event.target.name]: event.target.value});
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        fetch("http://localhost:8082/api/articles", {
            method: 'POST', 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(article)})
            .then((res) => {
                console.log(res);
                setArticle(DefaultEmptyArticle);
                
                setTimeout(() => {
                    setLoading(false);
                    navigate.push("/submit/success");
                },  1500);
            })
            .catch((err) => {
                console.log('Error from CreateArticle: ' + err);
                setLoading(false);
            });
    };

    return (
        <div className="CreateArticle">
            { loading ? (
                <div className="loading-screen text-center vert-center">
                    <h3 className="text-header">Submitting your article...</h3>
                    <br />
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <h3 className="text-center text-header">Submit a Software Engineering Practice article to SPEED</h3>
                            <br />
                        </div>

                        <div className="col-md-8 m-auto">
                            <form onSubmit={onSubmit}>
                                
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Article Title"
                                        name="title"
                                        className="form-control"
                                        value={article.title}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Author"
                                        name="author"
                                        className="form-control"
                                        value={article.author}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Journal/Conference Name"
                                        name="journal_name"
                                        className="form-control"
                                        value={article.journal_name}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className="row">
                                    <div className="form-group col-sm">
                                        <input
                                            required
                                            type="string"
                                            placeholder="Publication Year"
                                            name="publication_year"
                                            className="form-control"
                                            value={article.publication_year}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <br />

                                    <div className="form-group col-sm">
                                        <input
                                            type="text"
                                            placeholder="Volume"
                                            name="volume"
                                            className="form-control"
                                            value={article.volume}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <br />

                                    <div className="form-group col-sm">
                                        <input
                                            type="text"
                                            placeholder="Pages"
                                            name="pages"
                                            className="form-control"
                                            value={article.pages}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <br />
                                </div>
                                <br />

                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        placeholder="DOI"
                                        name="doi"
                                        className="form-control"
                                        value={article.doi}
                                        onChange={onChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-primary btn-block mt-4 mb-4 w-100"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateArticleComponent;