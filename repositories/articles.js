const{ Article, Tag } = require('../models')

module.exports = {
    getAllArticles(){
        return Article.findAll()
    },
    getArticles(offset =0, limit =10){
        return Article.findAll({ offset: offset, limit: limit })
    },
    getArticle(id){
        return Article.findAll({ where: {id: id} })
    },
    getAllUserArticles(id){
        return Article.findAll({ where: {UserId : id}})
    },
    getArticleTags(id) {
        return Article.findByPk(id, {
            attributes: [],
            include: [
              {
                model: Tag,
                through: { attributes: [],}
              },
            ],
          })
    },
    addArticle(article){
        return Article.create({
            title: article.title,
            content: article.content,
            published: article.published,
            UserId: article.UserId
        })
    },
    addTagToArticle(ArticleId, TagId){
        return Tag.findByPk(TagId)
        .then((tag)=> {
            tag.addArticle(ArticleId)
        })
        .catch(err => console.log(err))
    },
    updateArticleTitle(id, new_value){
        return Article.update({ title: new_value }, { where: {id: id} })
    },
    updateArticleContent(id, new_value){
        return Article.update({ content: new_value }, { where: {id: id} })
    },
    updateArticlePublished(id, new_value){
        return Article.update({ published: new_value }, { where: {id: id} })
    },
    deleteArticleTag(ArticleId,TagId)
    {
        return Tag.findByPk(TagId)
        .then((tag)=> {
            tag.removeArticle(ArticleId)
        })
        .catch(err => console.log(err))
    },
    deleteArticle(id) {
        return Article.destroy({ where: {id: id}})
     },
}