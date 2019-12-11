
var ManagementClient = require('auth0').ManagementClient;

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

    return result
}

module.exports = {
    latestCitizen
}