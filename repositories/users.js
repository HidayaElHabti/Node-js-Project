const{ User } = require('../models')

module.exports = {
    getAllUsers() {
        return User.findAll()
    },
    getUsers(offset =0, limit =10) {
        return User.findAll({ offset: offset, limit: limit })
     },
    getAdmins() {
        return User.findAll({ where: {role: "admin"} })
     },
    getAuthors() {
        return User.findAll({ where: {role: "author"} })
     },
    getGuests(){
        return User.findAll({ where: {role: "guest"} })
     },
    getUser(id) {
        return User.findAll({ where: {id: id} })
     },
    getUserByEmail(email) {
        return User.findAll({ where: {email: email} })
     },
    addUser(user) {
        return User.create({
            username: user.username, 
            email: user.email, 
            password: user.password,
            role: user.role 
            })
     },
    updateUserUsername(id, new_value) {
        return User.update({ username: new_value }, { where: {id: id} })
     },
    updateUserEmail(id, new_value) {
        return User.update({ email: new_value }, { where: {id: id} })
     },
    updateUserPassword(id, new_value) {
        return User.update({ password: new_value }, { where: {id: id} })
     },
    updateUserRole(id, new_value) {
        return User.update({ role: new_value }, { where: {id: id} })
     },
    deleteUser(id) {
        return User.destroy({ where: {id: id}})
     },
}