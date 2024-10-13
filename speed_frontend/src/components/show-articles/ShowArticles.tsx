'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Article {
    title: string;
    author: string;
    journal_name: string;
    publication_year: string;
    volume: string;
    pages: string;
    doi: string;

    se_relevancy: boolean;
    peer_reviewed: boolean;
    moderation_flag: boolean;

    claims: boolean;
    evidence: string;
    evidence_result: boolean;
    participant: string;
    research_type: string;
    analysis_flag: boolean;

    rejection_reason: string;
    status: string;
    updated_date: Date;
}

function ShowArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/articles/`)
        .then(response => {
            setArticles(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className='container-fluid text-center'>
                <h3>Loading articles...</h3>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className='container-fluid text-center'>
                <h3>There are currently no articles in SPEED.</h3>
                <br />
                <Link href='/submit' className='btn btn-primary btn-lg'>Submit an article</Link>
            </div>
            
        );
    } else {
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
}

export default ShowArticles;