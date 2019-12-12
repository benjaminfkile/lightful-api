const path = require('path')
const express = require('express')
const xss = require('xss')
const ArticlesService = require('./articles-service')

const articlesRouter = express.Router()
const jsonParser = express.json()

// const serializeArticle = article => ({
//   id: article.id,
//   style: article.style,
//   title: xss(article.title),
//   content: xss(article.content),
//   date_published: article.date_published,
// })

articlesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ArticlesService.getAllArticles(knexInstance)
      .then(articles => {
        res.json(articles)
      })
      //whats catch(next)?
      .catch(next)
  })


module.exports = articlesRouter