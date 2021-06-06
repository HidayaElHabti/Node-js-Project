const{ Comment } = require('../models')

module.exports = {
    getAllComments() {
        return Comment.findAll({order: ['ArticleId']})
    },
    getComment(id) {
        return Comment.findAll({ where: {id: id} })
     },
    getArticleComments(id) {
        return Comment.findAll({ where: {ArticleId: id} })
     },
    addComment(comment) {
        return Comment.create({
            content: comment.content,
            ArticleId: comment.ArticleId 
            })
     },
    updateCommentContent(id, new_value) {
        return Comment.update({ content: new_value }, { where: {id: id} })
     },
    deleteComment(id) {
        return Comment.destroy({ where: {id: id}})
     },
}