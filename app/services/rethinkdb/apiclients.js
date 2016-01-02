var r = require('rethinkdb')

var conf = require('../../../config.json').rethinkdb
var debug = require('debug')('Server')

var utils = require('../../../oauth/utils')
// Nakładka na serwisy danych ograniczająca dostęp do prywatnych atrybutów
var Protect = require('../../../lib/protect')

module.exports = Protect({

  name: 'APIClients',

  read: function(req, resource, params, config, callback) {
    r.connect(conf, function(error, conn){
      if(error) { // Wystąpił błąd przy połączeniu z bazą danych
        callback(error)
        return
      }

      var id = params.user_id
      if(!id) { return callback("Błąd: Brak parametru `user_id`.") }

      // Pobierz klientów API stworzonych przez użytkownika
      r.table("APIClients")
        .getAll(id, {index: 'user_id'})
        .run(conn, function(err, cursor){

        if(err) { callback(err) }
        else { cursor.toArray(callback) }
      })
    })
  },

  create: function(req, resource, params, body, config, callback) {
    // Połącz się z bazą danych `sdm`
    r.connect(conf, function(err, conn) {
      if(err) {
        callback(err)
        return
      }

      body.created_at = new Date()
      body.secret = utils.uid(40)
      body.user_id = req.user.id

      r.table(resource).insert(body, {returnChanges: true}).run(conn, function(err, result) {
        if(err) { callback(err) }
        else {
          callback(null, result)
        }
      })
    })
  }

})