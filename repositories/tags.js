const{ Tag, Article } = require('../models')

module.exports = {
    getAllTags() {
        return Tag.findAll()
    },
    getTags(offset =0, limit =10) {
        return Tag.findAll({ offset: offset, limit: limit })
     },
    getTag(id) {
        return Tag.findAll({ where: {id: id} })
     },
    getTagArticles(id) {
        return Tag.findByPk(id, {
            attributes: [],
            include: [
              {
                model: Article,
                through: { attributes: [],}
              },
            ],
          })
    },
    addTag(tag) {
        return Tag.create({
            name: tag.name
            })
     },
    updateTagName(id, new_value) {
        return Tag.update({ name: new_value }, { where: {id: id} })
     },
    deleteTag(id) {
        return Tag.destroy({ where: {id: id}})
     },
}