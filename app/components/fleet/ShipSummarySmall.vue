<template>
    <div class="ship-summary" @click="selected" :title="ship.model">
        <section-title v-if="ship.name" :text="ship.name"/>
        <img :src="shipImage" />
        <img class="manufacturer" :src="manufacturerImage" />
        <div class="ship-info">
            <h5>{{ ship.model }}</h5>
            <div>{{ ship.type }} - {{ ship.focus }}</div>
            <div v-if="ship.owner">Owner: <nuxt-link :to="citizenLink">{{ship.owner.name}}</nuxt-link></div>
        </div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
        <input v-if="isOwner" type="button" class="remove-ship" @click="$emit('remove', ship.id)" value="X" />
    </div>
</template>

<script>
export default {
    name: 'ship-summary',
    props: ["ship", "isOwner"],
    computed: {
        shipImage: function() {
            return `/images/ships/${this.ship.short_name}.jpg`
        },
        manufacturerImage: function () {
            return `/images/manufacturers/${this.ship.make_abbr}.png`
        },
        citizenLink: function () {
            return `/citizens/${this.ship.owner.handle}`
        }
    },
    methods: {
        selected() {
            this.$emit('selected', this.ship)
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 75px;
        flex-basis: 90%;
        flex-grow: 1;
    }

    .ship-summary {
        display: flex;
        flex-grow: 1;
        flex-basis: 300px;
        margin: 5px;
        margin-bottom: 10px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        /*cursor: pointer;*/
    }

    .ship-info {
        margin-left: 10px;
        padding-right: 55px;
        flex-grow: 1;
        z-index: 2;
        font-size: calc(12px + (14 - 12) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
    }

    .manufacturer {
        position: absolute;
        right: 0;
        align-self: center;
        width: 70px;
        opacity: 0.8;
    }

    .remove-ship {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 20;
        font-size: 12px;
    }
</style>