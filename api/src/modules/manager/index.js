const { domain, clientId, clientSecret, scope, audience } = require("../../config/auth_config.js");

var ManagementClient = require('auth0').ManagementClient;

var manager = new ManagementClient({
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

module.exports = {
    manager
}