
var ManagementClient = require('auth0').ManagementClient;
const {pool, getData} = require('./mariadb')

const { domain, clientId, clientSecret, scope, audience } = require("../config/auth_config.js");

var management = new ManagementClient({
    domain: domain,
    clientId: clientId,
    clientSecret: clientSecret,
    scope: scope,
    audience: audience,
    tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: 10
    }
});

function loadStat(stat) {
    sql = "SELECT value FROM stats WHERE stat=?"
    const res = getData(sql, [stat])[0].value
    return res
}

function saveStat(stat, value) {
    sql = "REPLACE INTO stats (stat, value) VALUES (?,?)"
    getData(sql, [stat,value])
}

async function latestCitizen() {
    var params = {
        page: 0,
        per_page: 1,
        fields: 'details.response.body.app_metadata',
        q: 'type:"sapi" AND description:"Update a user"'
    }

    const result = await management.getLogs(params).then((res) => {
        return res
    }).catch((err) => {
        console.error(err)
    });

    latest = ""

    if(result) {
        data = result[0].details.response.body.app_metadata
        if(data.handle_verified) {
            latest = data.handle
            saveStat("latestCitizen", latest)
        } else {
            latest = loadStat("latestCitizen")
        }
    } else {
        latest = loadStat("latestCitizen")
    }

    return latest
}

async function userCount() {
    var params = {
        search_engine: 'v3',
        per_page: 0,
        page: 0,
        include_totals: true
      };
      
    const result = await management.getUsers(params).then((res) => {
        return res.total
    }).catch(err => {
        console.error(err)
    });

    return result
}

async function activeUsers() {
    const count = await management.stats.getActiveUserCount().then((count) => {
        return count
    })
    return count
}

async function getStats() {
    stats = {}
    stats.latestCitizen = await latestCitizen()
    stats.userCount = await userCount()
    stats.activeUsers = await activeUsers()
    return stats
}

module.exports = {
    getStats
}