'use strict';

var express = require('express')
var path = require('path')
var app = express()
var colors = require('colors')
var parser = require('./parser')
var fs = require('fs')
/**
 *  midllewares
 **/
var compression = require('compression')
app.use(compression())

/**
 *  static folder
 **/
app.use(express.static(path.join(__dirname, 'public')))

app.get('/r/:board', function (req, res) {
    parser.board(req.params.board, function (err, data) {
        if (!err) {
            return res.status(200).send(data)
        }
        res.status(500).send(err)
    })
})

/**
 *  tasks
 */
var storePath = './store'
if (fs.existsSync(storePath)) fs.readdirSync(storePath)
Chain(function () {
    parser.board(req.params.board, function (err, data) {
        if (!err) {
            return res.status(200).send(data)
        }
        res.status(500).send(err)
    })
})
.start()



/**
 *  server and port
 **/
var port = process.env.PORT || 1024
app.listen(port, function () {
    console.log('Server is listen on port', String(port).blue)
})