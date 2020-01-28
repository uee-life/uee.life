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
              <main-panel title="roles" mainClass="info-panel">
                <ul class="info-items">
                  <li v-if="org.roles" class="line-item"><span>Primary Role</span><span>{{ org.roles.primary }}</span></li>
                  <li v-if="org.roles" class="line-item"><span>Secondary Role</span><span>{{ org.roles.secondary }}</span></li>
                </ul>
              </main-panel>
              <main-panel title="headquarters" mainClass="info-panel">
                <ul class="info-items">
                  <li class="line-item"><div>System</div><div>Unknown</div></li>
                  <li class="line-item"><div>Planet</div><div>Unknown</div></li>
                  <li class="line-item"><div>City:</div><div>Unknown</div></li>
                </ul>
              </main-panel>
              <main-panel title="founders" mainClass="info-panel">
                <ul class="info-items">
                  <li v-for="f in org.founders" :key="f.handle" class="line-item">
                    <router-link :to="citizenLink(f.handle)">
                      {{f.name}}
                    </router-link>
                  </li>
                </ul>
              </main-panel>
            </div>
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

export default {
  name: 'org-info',
  props: ['org'],
  data() {
    return {
      tabs: ["overview", "history", "manifesto", "charter"],
      initialTab: "overview"
    }
  },
  methods: {
    citizenLink(handle) {
      return `/citizens/${handle}`
    },
  }
}
</script>

<style>
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
</style>