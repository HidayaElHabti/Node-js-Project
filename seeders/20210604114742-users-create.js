'use strict';

const faker = require('faker');

var chance = require('chance').Chance();

const users = [...Array(20)].map((user) => (
  {
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    role: chance.weighted(['admin', 'author', 'guest'], [1, 2, 3]),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
