var apiURL = 'https://www.capnflint.com:4443'

Vue.component('org', {
    template: `
        <div class="org">
            <img class="org-banner" :src="banner">
            <img class="org-logo" :src="logo">
            <div class="org-name">{{name}}</div>
            <div class="members">Members: {{count}}</div>
            <div class="bio" v-html="bio"></div>
        </div>
    `,
    data() {
        return {
            logo: 'https://robertsspaceindustries.com/media/2weountodg09pr/logo/MCBANE-Logo.png',
            banner: 'https://robertsspaceindustries.com/media/4mnm79mcq45gwr/banner/MCBANE-Banner.jpg',
            count: 80,
            name: 'McBane Enterprises',
            bioText: 'McBane enterprises. We aim to misbehave.\nGet a crew, get a job, keep flying.\nFor Science!\nhttp://twitch.tv/Capn_Flint\n'
        }
    },
    computed: {
        bio() {
            return this.bioText.split('\n').join('<br/>');
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        name: 'Daymar'
    }
});