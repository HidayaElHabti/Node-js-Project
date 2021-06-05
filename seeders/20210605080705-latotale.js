'use strict';

const faker = require('faker');

const chance = require('chance').Chance();

var users = [...Array(20)].map((user,index) => (
  {
  	id: index+1,
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    role: chance.weighted(['admin', 'author', 'guest'], [1, 2, 3]),
    createdAt: faker.date.between('2020-01-01', new Date()),
    updatedAt: new Date()
  }
))

var tags = [...Array(10)].map((tag) => (
  {
    name: faker.random.words(3),
    createdAt: faker.date.between('2020-01-01', new Date()),
    updatedAt: new Date()
  }
))

var articles = Array();
var articlesIndex = 1;
users.forEach((user)=>
{
	var nbrArticles = faker.datatype.number({'min':2, 'max':10});
	for(var i=0; i<nbrArticles; i++)
	{
		articles.push({
			id: articlesIndex,
			title: faker.name.title(),
			content: faker.lorem.paragraphs(faker.datatype.number({'min':1, 'max':5})),
			published: chance.weighted([true, false], [3, 1]),
			createdAt: faker.date.between(user.createdAt, new Date()),
			updatedAt: new Date(),
			UserId: user.id
		})
		articlesIndex++;
	}
})

var articletags = Array();
var comments = Array();
articles.forEach((article)=>
{
	var tagIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	var nbrTags = faker.datatype.number({'min':2, 'max':6});
	for(var i=0; i<nbrTags; i++)
	{
		var tagRandomId = chance.pickone(tagIndex);
		articletags.push({
      createdAt: article.createdAt,
      updatedAt: new Date(),
			ArticleId: article.id,
			TagId: tagRandomId
		})
		var index = tagIndex.indexOf(tagRandomId);
	  tagIndex.splice(index,1);
	}
	var nbrCommts = faker.datatype.number({'min':0, 'max':10});
	for(var i=0; i<nbrCommts; i++)
	{
		comments.push({
      ArticleId: article.id,
			content: faker.lorem.sentence(),
			createdAt: faker.date.between(article.createdAt, new Date()),
			updatedAt: new Date(),
		})
	}
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {});
  
    await queryInterface.bulkInsert('Tags', tags, {});

    await queryInterface.bulkInsert('Articles', articles, {});

    await queryInterface.bulkInsert('Comments', comments, {});

    return await queryInterface.bulkInsert('ArticleTags', articletags, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ArticleTags', null, {});

    await queryInterface.bulkDelete('Comments', null, {});

    await queryInterface.bulkDelete('Articles', null, {});

    await queryInterface.bulkDelete('Tags', null, {});

    return await queryInterface.bulkDelete('Users', null, {});
  }
};
