var pg = require('pg');

// Change to config.pg_local_url if working on local
var pgURL = process.env.DATABASE_URL || 'postgres://tanaysalpekar@localhost:5432/chat';
// var pgURL = config.pg_local_url;

function pgQuery(queryString, callback) {
    pg.connect(pgURL, function(err, client, done) {
        if (err) {
            callback(err);
        }
        client.query(queryString, function(err, result) {
            if (err) {
                return console.error('Error running query ', err);
            }
            callback(null, result);
            client.end();
        });

    });
}

module.exports = {
 getMessages: function(callback) {
        // No need for time zone conversion!

        var getMessagesQueryString = 'SELECT sent_by, msg, to_char(time, \'HH24:MI\') as time FROM messages';

        pgQuery(getMessagesQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.rows);
            }
        });
    },
  insertMessage: function(sent_by, msg, callback) {
    var insertMessageQueryString = 'INSERT INTO messages (sent_by, msg, time) VALUES (\'' + sent_by +  ' \',\'' + msg + '\', now())';
    pgQuery(insertMessageQueryString, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
  }
}
