const ArticlesService = {
  getAllArticles(knex) {
    console.log('wtf');
    return knex.select('*').from('lights')
  },
 
  updateArticle(knex, id, newArticleFields) {
    return knex('lights')
      .where({ id })
      .update(newArticleFields)
  },
}

module.exports = ArticlesService