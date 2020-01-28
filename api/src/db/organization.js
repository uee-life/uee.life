const axios = require('axios')
const cheerio = require('cheerio')

async function fetchMembers(org, page, isMain) {
    let members = {
        count: 1,
        members: []
    }
    /*await axios.get(`http://api.sc-tools.org/v1/orgs/${org}/json`).then(res => {
        if(res.data.status == 'ok') {
            console.log(res.data.orgs.members)
            members = res.data.orgs.members;
        } else {
            members = []
        }
    })*/

    console.log("isMain: ")
    console.log(isMain)

    try {
        const url = "https://robertsspaceindustries.com/api/orgs/getOrgMembers"
        let i = 0
        data = {
            symbol: org,
            search: '',
            pagesize: 32,
            main_org: isMain == true ? "1" : "0",
            page: page
        }

        console.log(data)

        members = await axios({
            url: url,
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: data
        }).then((res) => {
            let members = []
            const totalMembers = res.data.data.totalrows
            const html = res.data.data.html
            const $ = cheerio.load(html)

            $('li.member-item').each(function (i, el) {
                let handle = $(el).find('span.nick').text()
                let name = $(el).find('span.name').text()
                let starspan = $(el).find('span.stars').attr('style')
                let thumb = 'https://robertsspaceindustries.com/rsi/static/images/account/avatar_default_big.jpg'
                let stars = 0
                if (starspan) {
                    stars = parseInt(starspan.match(/width\:\ (.*)\%/)[1])

                    if(stars) {
                        stars = stars / 20
                    }

                    thumbimg = $(el).find('span.thumb').find('img')[0]
                    if(thumbimg && thumbimg.attribs.src) {
                        thumb = `https://robertsspaceindustries.com${thumbimg.attribs.src}`
                    }

                } else {
                    stars = 0
                }

                if(handle.trim() != '') {
                    member = {
                        name: name,
                        handle: handle,
                        stars: stars,
                        thumb: thumb
                    }
                    members.push(member)
                } else {
                    member = {
                        name: 'Redacted',
                        handle: 'Redacted',
                        stars: stars,
                        thumb: thumb
                    }
                    members.push(member)
                }
            })

            result = {
                count: totalMembers,
                members: members
            }
            
            return result
        }).catch((err) => {
            console.error(err)
        })
    } catch (error) {
        console.error(error)
        return {error: "Couldn't grab org members!"}
    }
    return members
}

async function fetchOrg(org) {
    try {
        const baseURI = "https://robertsspaceindustries.com"
        const resp = await axios.get(baseURI + '/orgs/' + org)
        const $ = cheerio.load(resp.data)
        info = {}
        info.name = $('h1', '#organization').text().split("/")[0].trim()
        info.banner = baseURI + $('div.banner', '#organization').find('img').attr('src')
        info.logo = baseURI + $('div.logo', '#organization').find('img').attr('src')
        info.count = $('div.logo', '#organization').find('span').text().split(" ")[0]
        info.bio = $('div.body').text()
        info.model = $('ul.tags', '#organization').find('li.model').text()
        info.roles = {}
        info.roles.primary = $('ul.focus', '#organization').find('li.primary').find('img').attr('alt')
        info.roles.secondary = $('ul.focus', '#organization').find('li.secondary').find('img').attr('alt')
        info.intro = $('div.join-us', '#organization').find('div.markitup-text').html()
        info.history = await convertToMarkdown($('h2:contains("History")', '#organization').next().html())
        info.manifesto = $('h2:contains("Manifesto")', '#organization').next().html()
        info.charter = $('h2:contains("Charter")', '#organization').next().html()
        info.founders = await fetchOrgFounders(org)
        //info.members = await fetchMembers(org)
        
        info.tag = org

        return info
    } catch (error) {
        console.error(error)
        return {error: "Org Not found!"}
    }
}

tagmap = {

}

async function convertToMarkdown(html) {
    console.log(html)
    const $ = cheerio.load(html)

    $('blockquote').each(function (i, el) {
        $(el).replaceWith($(el).html(.replace(/\n/g, '')))
        $(el).find('br').each(function(i, el) {
            $(el).replaceWith('\n> ')
        })
        $(el).replaceWith('> ' + $(el).html())
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
        $(el).replaceWith('*' + $(el).text() + '*')
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
    $('br').each(function (i, el) {
        $(el).remove()
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

    /*$('p').each(function (i, el) {
        $(el).replaceWith($(el).html())
    })*/

    return $.text().replace(/\t/g, '')
}

async function test() {
    return convertToMarkdown()
}

async function fetchOrgFounders(org) {
    try {
        const resp = await axios.post('https://robertsspaceindustries.com/api/orgs/getOrgMembers', {
            symbol: org,
            search: "",
            role: "1"
        });
        const $ = cheerio.load(resp.data.data.html)
        founders = []
        $('li.member-item').each(function (i, el) {
            let handle = $(el).find('span.nick').text()
            let name = $(el).find('span.name').text()
            founders[i] = {}
            founders[i]['name'] = name
            founders[i]['handle'] = handle
        })
        return founders
    } catch (error) {
        console.error(error)
        return {error: "Org not found!"}
    }
}

async function getOrgFounders(org) {
    return await fetchOrgFounders(org)
}

async function getOrganization(org) {
    return await fetchOrg(org)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

async function getOrgMembers(org, page=1, isMain=true) {
    if(!parseInt(page)) {
        page = 1
    }
    members = await fetchMembers(org, page, isMain)

    console.log({org: org, isMain: isMain})

    return members
}


module.exports = {
    getOrganization,
    getOrgFounders,
    getOrgMembers,
    test
};