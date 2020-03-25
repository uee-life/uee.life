<template>
    <div class="about">
        <portal to="leftDock">
            <dock-item class="nav" title="nav">
                <div class="left-nav-button"><nuxt-link :to="{ hash: 'about'}">About UEE.life</nuxt-link></div>
                <div class="left-nav-button"><nuxt-link :to="{ hash: 'social' }">Social Links</nuxt-link></div>
                <div class="left-nav-button"><nuxt-link :to="{ hash: 'support' }">Support Us</nuxt-link></div>
                <div class="left-nav-button"><nuxt-link :to="{ hash: 'releases' }">Releases</nuxt-link></div>
            </dock-item>
            <made-by />
        </portal>
        <section id="about">
            <site-content tag="about" />
        </section>
        <section id="social">
            <site-content tag="social" />
        </section>
        <section id="support">
            <site-content tag="support" />
        </section>
        <section id="releases">
            <site-content tag="releases" />
        </section>
    </div>
</template>

<script>
import SiteContent from '@/components/content/SiteContent'
import MadeBy from '@/components/widgets/MadeBy'

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  name: 'about',
  components: {
      SiteContent,
      MadeBy
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
    .about {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .nav {
        display: flex;
        flex-direction: column;
    }
</style>