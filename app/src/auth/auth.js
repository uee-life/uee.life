import { domain, clientId,/* audience*/ } from "../../auth_config.json";
import Auth0Lock from 'auth0-lock'


var lock = new Auth0Lock(
    clientId,
    domain
);
  

var Auth = (function() {
    var wm = new WeakMap();
    var privateStore = {};
    //var lock;
  
    function Auth() {
      /*var lock = new Auth0Lock(
        clientId,
        domain
      );*/
      wm.set(privateStore, {
        appName: "uee.life"
      });
    }
  
    Auth.prototype.getProfile = function() {
      return wm.get(privateStore).profile;
    };
  
    Auth.prototype.authn = function() {
      this.lock.on("authenticated", function(authResult) {
        this.getUserInfo(authResult.accessToken, function(error, profile) {
          if(error) {
            return;
          }
  
          wm.set(privateStore, {
            accessToken: authResult.accessToken
          });
  
          wm.set(privateStore, {
            profile: profile
          });
  
        });
      });
    };
    return Auth;
}());

module.exports = {
    Auth,
    lock
}