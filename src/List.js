import React from "react";
import SinglePage from "./SinglePage";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import axios from 'axios';
import server from "./constanta";
const List = () => {
  const [articles, setArticles] = useState([])
  useEffect(()=>{

    axios.post(`${server}/api/get-articles`,{})
    .then(res => {
        setArticles(res.data)
    })
  }, [])
  return(<>
    <ArticleList articles={articles} />
  </>)
};
export default List;
