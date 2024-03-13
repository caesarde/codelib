import React from 'react';
import { Link } from 'react-router-dom';
import server from './constanta';
const ArticleList = ({ articles }) => (
  <div className="row app">
    {articles.map((article, key) => (
      <div className="col-md-4 p-3">
        <Link className="card p-1" key={key} to={`/article/${article.id}`}>
          <img
            className="img-fluid card"
            alt="{article.title}"
            src={`${server}/api/get-image/${article.id}`}
          />
          <section className="card-content p-3">
            <h3>
              {article.title} <span className="cute">✏️</span>
            </h3>
            <p className="date">
              👧{article.author} ⏰{' '}
              {article.created_at}
            </p>
            <p>📝 {article.description}</p>
          </section>
        </Link>
      </div>
    ))}
  </div>
);

export default ArticleList;
