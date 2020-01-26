<template>
    <div id="ship-summary" class="ship-summary">
        <img :src="shipImage" />
        <img class="manufacturer" :src="manufacturerImage" />
        <div class="ship-info">
            <div v-if="ship.name"><i><b>"{{ ship.name }}"</b></i></div>
            <h5>{{ ship.model }}</h5>
            <div>{{ ship.type }} - {{ ship.focus }}</div>
            <div>Crew: {{ ship.max_crew }}</div>
            <div>Cargo: {{ ship.cargo }}</div>
        </div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
    </div>
</template>

<script>
export default {
    name: 'ship-summary',
    props: ["ship"],
    computed: {
        shipImage: function() {
            return "images/ships/" + this.ship.short_name + ".jpg"
        },
        manufacturerImage: function () {
            return `images/manufacturers/${this.ship.make_abbr}.png`
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 170px;
        flex-basis: 90%;
        flex-grow: 1;
    }

    .ship-summary {
        display: flex;
        width: 400px;
        min-width: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .ship-info {
        margin-left: 10px;
        z-index: 2;
    }

    .ship-info>h5 {
        font-size: 14px;
    }

    .manufacturer {
        position: absolute;
        right: 0;
        width: 100px;
        opacity: 0.8;
    }
</style>