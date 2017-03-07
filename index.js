const http = require('http')
const request = require('request')
const pug = require('pug')

const port = 8181

const req_options = {
    url: 'https://api.github.com/search/users?q=location:singapore',
    headers: {
        'User-Agent': 'superduperawesomeapp'
    }
}

const template = pug.compileFile('./index.pug')

function handler(req, res) {
    request(req_options, function(err, result, body) {
        const data = JSON.parse(body)
        const users = data.items
        res.end(template({ users: users }))
    })
}

const server = http.createServer(handler)
server.listen(port, function() {
    console.log("Server started at http://localhost:%s", port)
})
