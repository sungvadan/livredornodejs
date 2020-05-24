const DB = require('../config/db')
class Message {
    static save (message, cb) {
        DB.query('INSERT INTO message(message, created_at) VALUES(?, ?)', [message, new Date()], function (err) {
            if (err) throw err
            console.log('ici')
            cb()
        })
    }

    static get (cb) {
        DB.query('select * from message', [], function (err, result) {
            if (err) throw err
            cb(result)
        })
    }
}

module.exports = Message