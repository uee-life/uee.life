<template>
  <div id="org-info" class="org-info">
      <tabs :tabs="tabs" :initialTab="initialTab">
        <template slot="tab-title-overview">
            OVERVIEW
        </template>
        <template slot="tab-content-overview">
          <main-panel>
                <div  class="org-intro" v-if="org.intro" v-html="$md.render(org.intro)"></div>
          </main-panel>
            <div class="info">
              <main-panel title="roles" class="info-panel">
                <ul class="info-items">
                  <li v-if="org.roles" class="line-item"><span>Primary Role</span><span>{{ org.roles.primary }}</span></li>
                  <li v-if="org.roles" class="line-item"><span>Secondary Role</span><span>{{ org.roles.secondary }}</span></li>
                </ul>
              </main-panel>
              <main-panel title="headquarters" class="info-panel">
                <ul class="info-items">
                  <li class="line-item"><div>System</div><div>Unknown</div></li>
                  <li class="line-item"><div>Planet</div><div>Unknown</div></li>
                  <li class="line-item"><div>City:</div><div>Unknown</div></li>
                </ul>
              </main-panel>
              <main-panel title="founders" class="info-panel">
                <div class="founders">
                  <portrait class="founder" v-for="f in founders" :key="f.handle" :handle="f.handle" size="small" :showName="true" />
                </div>
              </main-panel>
            </div>
            <org-fleet-view v-if="org" :org="org" :isOwner="isOwner"/>
        </template>

        <template slot="tab-title-history">
            HISTORY
        </template>
        <template slot="tab-content-history">
            <main-panel title="History">
                <div v-if="org.history" v-html="$md.render(org.history)"></div>
            </main-panel>
        </template>

        <template slot="tab-title-manifesto">
            MANIFESTO
        </template>
        <template slot="tab-content-manifesto">
            <main-panel title="Manifesto">
                <div v-if="org.manifesto" v-html="$md.render(org.manifesto)"></div>
            </main-panel>
        </template>

        <template slot="tab-title-charter">
            CHARTER
        </template>
        <template slot="tab-content-charter">
            <main-panel title="Charter">
                <div v-if="org.charter" v-html="$md.render(org.charter)"></div>
            </main-panel>
        </template>
    </tabs>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import OrgFleetView from '@/components/fleet/OrgFleetView'

export default {
  name: 'org-info',
  props: ['org', 'isOwner'],
  components: {
    OrgFleetView
  },
  data() {
    return {
      tabs: ["overview", "history", "manifesto", "charter"],
      initialTab: "overview",
      founders: []
    }
  },
  methods: {
    citizenLink(handle) {
      return `/citizens/${handle}`
    },
    async getCitizen(handle) {
      return await this.$axios({
        url: `https://api.uee.life/citizens/${handle}/info`,
        method: 'GET'
      }).then((res) => {
        if(res.status == 200) {
          return res.data
        } else {
          return ''
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    async loadFounders() {
      const founders = this.org.founders
      console.log(founders)
      for (let i in founders) {
        console.log(founders[i].handle)
        const citizen = this.getCitizen(founders[i].handle)
        founders[i].portrait = await this.getCitizen(founders[i].handle)
      }
      this.founders = founders
    }
  },
  watch: {
    org: {
        handler: async function () {
          if(this.org.founders.length > 0) {
            gsap.fromTo(".founders", {duration: 1, height: '20px'}, {'height': '145px'})
            this.loadFounders()
          }
        }
    }
  },
  mounted() {
    if(this.org && this.org.founders && this.org.founders.length > 0) {
      gsap.fromTo(".founders", {duration: 1, height: '20px'}, {'height': '145px'})
      this.loadFounders()
    }
  }
}
</script>

<style scoped>
    .org-info {
      position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .org-info .info {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 20px);
        margin-left: -10px;
        margin-right: -10px;
        opacity: 1;
    }

    .org-info .info .info-panel {
      flex-basis: 250px;
      margin-left: 10px;
      margin-right: 10px;
      flex-grow: 1;
    }

    ul.info-items {
      padding-left: 0;
      margin: 0 20px 0 20px;
    }

    .org-info .info .line-item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-left: 0px;
    }

    .org-intro {
      text-align: center;
    }

    .founders {
      display: flex;
      flex-wrap: wrap;
      height: fit-content;
    }

    .founders .portrait {
      margin: 5px 10px;
    }

    .founder img {
      width: 100px;
    }
</style>