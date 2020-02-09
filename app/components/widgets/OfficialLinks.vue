<template>
    <dock-item title="Official Links" class="official-links">
        <div v-for="link in links" :key="link.url" class="link">
            <a :href="link.url" target="_blank">{{link.name}}</a>
        </div>
    </dock-item>
</template>

<script>
import { gsap } from 'gsap'
export default {
    name: 'official-links',
    components: {
    },
    data() {
        return {
            links: [
                {name: "RSI Main Site", url: "https://robertsspaceindustries.com"},
                {name: "Galactapedia", url: "https://robertsspaceindustries.com/galactapedia"},
                {name: "Starmap", url: "https://robertsspaceindustries.com/starmap"},
                {name: "Spectrum", url: "https://robertsspaceindustries.com/spectrum/community/SC"},
                {name: "Community Hub", url: "https://robertsspaceindustries.com/community"},
            ]
        }
    },
    mounted() {
        gsap.to('.official-links', {duration: 0.5, opacity: 1})
    }
}
</script>

<style scoped>
    .official-links {
        opacity: 1;
    }

    .official-links>.link::before {
      content: "> "
    }
    .official-links>.link {
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 3px;
    }
    .official-links>.link>a {
      text-decoration: none;
      color: #39ced8;
    }
    .official-links>.link>a:hover {
      color: #dbf3ff;    
    }
</style>