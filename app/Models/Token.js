'use strict'

const Model = use('Model')

class Token extends Model {
  user() {
    return this.hasOne("App/Models/User");
  }
}

module.exports = Token
