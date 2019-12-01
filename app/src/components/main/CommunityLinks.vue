<template>
    <dock-item title="Community Links" mainClass="community-links">
        <div v-for="link in links" :key="link.url" class="link">
            <a :href="link.url" target="_blank">{{link.name}}</a>
        </div>
    </dock-item>
</template>

<script>

export default {
    name: 'community-links',
    components: {
    },
    data() {
        return {
            links: [
                {name: "Bar Citizens", url: "https://barcitizen.sc"},
                {name: "SC Tools", url: "https://sc-tools.org"},
                {name: "GameGlass", url: "https://gameglass.gg"},
                {name: "Ship fitting Calculator", url: "https://erkul.games/calculator"},
                {name: "Gallog Trade Tool", url: "https://gallog.co/trading/"},
                {name: "SC Ship Viewer", url: "https://www.starship42.com"}
            ]
        }
    }
}
</script>

<style>
    .community-links>.content {
        opacity: 1;
    }

    .community-links>.content>.link::before {
      content: "> "
    }
    .community-links>.content>.link {
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 3px;
    }
    .community-links>.content>.link>a {
      text-decoration: none;
      color: #39ced8;
    }
    .community-links>.content>.link>a:hover {
      color: #dbf3ff;    
    }
</style>