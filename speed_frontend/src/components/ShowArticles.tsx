'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Article {
    title: string;
    author: string;
    journal_name: string;
    publication_year: number;
    volume: number;
    pages: number;
    doi: string;
    status: string;
}

function ShowArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useRouter();

    useEffect(() => {
        axios.get(`http://localhost:8082/api/articles/`)
        .then(response => setArticles(response.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Journal Name
                        </th>
                        <th>
                            Publication Year
                        </th>
                        <th>
                            Volume
                        </th>
                        <th>
                            Pages
                        </th>
                        <th>
                            DOI
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.map((article: Article, index: number) => (
                            <tr key={index}>
                                <td>{article.title}</td>
                                <td>{article.author}</td>
                                <td>{article.journal_name}</td>
                                <td>{article.publication_year}</td>
                                <td>{article.volume}</td>
                                <td>{article.pages}</td>
                                <td>{article.doi}</td>
                                <td>{article.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ShowArticles;