const mcache = require('memory-cache');
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const cheerio = require('cheerio')

function convertToMarkdown(html) {
    const $ = cheerio.load(html)

    $('h1').each(function (i, el) {
        $(el).replaceWith('# ' + $(el).text() + '\n\n')
    })
    $('h2').each(function (i, el) {
        $(el).replaceWith('## ' + $(el).text() + '\n\n')
    })
    $('h3').each(function (i, el) {
        $(el).replaceWith('### ' + $(el).text() + '\n\n')
    })
    $('h4').each(function (i, el) {
        $(el).replaceWith('#### ' + $(el).text() + '\n\n')
    })
    $('h5').each(function (i, el) {
        $(el).replaceWith('##### ' + $(el).text() + '\n\n')
    })
    $('h6').each(function (i, el) {
        $(el).replaceWith('###### ' + $(el).text() + '\n\n')
    })
    $('strong').each(function (i, el) {
        $(el).replaceWith('**' + $(el).text() + '**')
    })
    $('del').each(function (i, el) {
        $(el).replaceWith('~~' + $(el).text() + '~~')
    })
    $('code').each(function (i, el) {
        $(el).replaceWith('`' + $(el).text() + '`')
    })
    $('a').each(function (i, el) {
        $(el).replaceWith('[' + $(el).text() + '](' + $(el).attr('href') + ')')
    })

    $('ul').each(function(i, el) {
        $(el).find('li').each(function(i, el) {
            $(el).replaceWith('* ' + $(el).text())
        })
        $(el).replaceWith($(el).text().trim() + '\n')
    })
    $('ol').each(function(i, el) {
        $(el).find('li').each(function(i, el) {
            $(el).replaceWith('1. ' + $(el).text())
        })
        $(el).replaceWith($(el).text() + '\n')
    })

    $('blockquote').each(function (i, el) {
        $(el).find('br').each(function(i, el2) {
            $(el2).replaceWith('\n> ')
        })
        $(el).replaceWith('> ' + $(el).html().replace(/(\n)[^\&]/g, ''))
    })

    /*$('p').each(function (i, el) {
        $(el).replaceWith($(el).html())
    })*/

    return $.text().replace(/\t/g, '').replace(/\>\s+/, '> ')
}

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if(cachedBody && !req.headers.skipcache) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ueelife.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://ueelife-api',
    issuer: `https://ueelife.auth0.com/`,
    algorithms: ['RS256']
});

function checkPermission (permission) {
    return (req, res, next) => {
        const { permissions } = req.user
        if (permissions.includes(permission)) return next()
        res.status(403).send()
    }
}

module.exports = {
    cache,
    checkJwt,
    checkPermission,
    convertToMarkdown
}