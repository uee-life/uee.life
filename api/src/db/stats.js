
var ManagementClient = require('auth0').ManagementClient;
const {executeSQL} = require('./mariadb')

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

async function loadStat(stat) {
    sql = "SELECT value FROM stats WHERE stat=?"

    const res = await executeSQL(sql, [stat])

    return res[0].value
}

function saveStat(stat, value) {
    sql = "REPLACE INTO stats (stat, value) VALUES (?,?)"
    executeSQL(sql, [stat,value])
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

    if(result.length) {
        data = result[0].details.response.body.app_metadata
        if(data.handle_verified && data.handle != 'Capn_Flint') {
            latest = data.handle
            saveStat("latestCitizen", latest)
        } else {
            latest = await loadStat("latestCitizen")
        }
    } else {
        latest = await loadStat("latestCitizen")
    }

    return latest
}

async function verifiedCount() {
    var params = {
        search_engine: 'v3',
        per_page: 0,
        page: 0,
        q: 'app_metadata.handle_verified:true',
        include_totals: true
      };
      
    const result = await management.getUsers(params).then((res) => {
        return res.total
    }).catch(err => {
        console.error(err)
    });

    return result
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

async function activeCount() {
    const count = await management.getActiveUsersCount().then((count) => {
        return count
    })
    return count
}

async function getStats() {
    stats = {}
    stats.latestCitizen = await latestCitizen()
    stats.users = {}
    stats.users.total = await userCount()
    stats.users.active = await activeCount()
    stats.users.verified = await verifiedCount()
    return stats
}

module.exports = {
    getStats
}