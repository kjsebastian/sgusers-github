const http = require('http')
const url = require('url')
const request = require('request')
const pug = require('pug')

const port = 8181

const template = pug.compileFile('./index.pug')

function handler(req, res) {
    let req_options = {
        url: 'https://api.github.com/search/users?q=location:singapore',
        headers: {
            'User-Agent': 'superduperawesomeapp'
        }
    }

    const params = url.parse(req.url, true).query
    req_options = add_params(params, req_options)
    request(req_options, function(err, result, body) {
        const data = JSON.parse(body)
        const users = data.items
        res.end(template({ users: users }))
    })
}

function add_params(params, req_options) {
    if (params.page) {
        req_options.url += `&page=${params.page}`
    }
    if (params.per_page) {
        req_options.url += `&per_page=${params.per_page}`
    }
    if (params.sort) {
        req_options.url += `&sort=${params.sort}`
    }
    if (params.order) {
        req_options.url += `&order=${params.order}`
    }
    return req_options
}

const server = http.createServer(handler)
server.listen(port, function() {
    console.log("Server started at http://localhost:%s", port)
})
