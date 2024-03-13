import React from 'react';
import ArticleContent from './ArticleContent';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import server from './constanta';
import axios from 'axios';

const SinglePage = ({ match }) => {
  const id_article = match.params.id;
  const [errorInput, setErrorInput] = useState(false)
  const [valueCreateComment, setValueCreateComment] = useState('')
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])

  useState(()=>{
    axios.post(`${server}/api/get-article`,{'id_article': id_article})
    .then(res => {
      setArticle(res.data)
    })

    axios.post(`${server}/api/get-comments`,{'id_article': id_article})
    .then(res => {
      setComments(res.data)
    })
  }, [])

  const createComment=()=>{
    if(valueCreateComment.length == 0){
      setErrorInput(true)
    }else{
      axios.post(`${server}/api/create-comment`,{'id_article': id_article, 'text': valueCreateComment})
      .then(res => {
        if(res.data.status == 'ok'){
          setErrorInput(false)
          setComments(prevComments => [valueCreateComment, ...prevComments]);
          setValueCreateComment('')
        }
      })
      
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{article.title}</title>
        <meta content={article.description} name="description" />
        <meta content={article.title} property="og:title" />
        <meta content={article.description} property="og:description" />
        <meta content={`${server}/api/get-image/${article.id}`} property="og:image" />
        <meta content="https://axcora.com/getaxcoracms" property="og:author" />
        <meta content={article.title} name="facebook:title" />
        <meta content="website" property="og:type" />
        <meta content={`${server}/api/get-image/${article.id}`} name="facebook:image" />
        <meta content={article.title} property="og:site_name" />
        <meta content={article.description} property="facebook:description" />
        <meta content="summary_large_image" name="twitter:card" />
        <link rel="apple-touch-icon" href={`${server}/api/get-image/${article.id}`} />

        <link href={`${server}/api/get-image/${article.id}`} rel="icon" type="image/x-icon" />
        <meta content={`${server}/api/get-image/${article.id}`} name="twitter:image" />
        <meta content={article.description} name="twitter:description" />
        <meta content={article.title} name="twitter:title" />
      </Helmet>
      <div className="p-1">
        <div className="card p-1">
          <img
            className="img-fluid card"
            alt={article.title}
            src={`${server}/api/get-image/${article.id}`}
          />
          <main className="card-content p-3 p-md-5">
            <h1>
              <a href="/"> {article.title}</a> <span className="cute">✏️</span>
            </h1>
            <h3>{article.description}</h3>
            <p className="date">
              👧{article.author} ⏰{' '}
              {article.created_at}
            </p>
            
          </main>
        </div>
      </div>
      <div className='main-comment'>
              <h1>Коментарии</h1>
              <div className='create-comment'>
                  <input value={valueCreateComment} onChange={(e) => {setValueCreateComment(e.target.value)}} style={{
                    borderColor: errorInput ? 'red' : ''
                  }}/>
                  <button onClick={createComment}>Отправить</button>
              </div>
              <div className='comments'>
                {
                  comments.map((text, key)=>(
                    <div className='card p-3 p-md-5 m-b10' key={key}>
                      <p>{text}</p>
                    </div>
                  ))
                }
              </div>
      </div>
    </>
  );
};
export default SinglePage;
