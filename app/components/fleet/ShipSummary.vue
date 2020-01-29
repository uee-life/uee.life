<template>
    <div class="ship-summary"  @click="selected">
        <section-title v-if="ship.name" :text="ship.name"/>
        <img :src="shipImage" />
        <img class="manufacturer" :src="manufacturerImage" />
        <div class="ship-info">
            <h5>{{ ship.model }}</h5>
            <div>
                <div class="info">
                    <span>Designation:</span>
                    <span class="info">Type:</span>
                    <span class="info">Focus:</span>
                    <span class="info">Ship &nbsp; ID:</span>
                </div>
                <div class="data">
                    <span>{{ ship.name || '--' }}</span>
                    <span class="data">{{ ship.type }}</span>
                    <span class="data">{{ ship.focus }}</span>
                    <span class="data">{{ 'UES-' + ('00' + ship.id.toString(16).toUpperCase()).substr(-6) }}</span>
                </div>
            </div>
            <div v-if="ship.owner">Owner: <nuxt-link :to="citizenLink">{{ship.owner}}</nuxt-link></div>
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
            return `/images/ships/${this.ship.short_name}.jpg`
        },
        manufacturerImage: function () {
            return `/images/manufacturers/${this.ship.make_abbr}.png`
        },
        citizenLink: function () {
            return `/citizens/${this.ship.owner}`
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
    .ship-summary img {
        max-width: 170px;
        flex-basis: 90%;
        flex-grow: 1;
        align-self: flex-start;
    }

    .ship-summary {
        display: flex;
        flex-basis: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-left: 1px solid #546f84;
        border-right: 1px solid #546f84;
        cursor: pointer;
    }

    .ship-info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        z-index: 2;
        flex-grow: 1;
    }
    
    .ship-info div {
        display: flex;
        max-width: 300px;
    }

    .ship-info div div.info {
        display: flex;
        flex-direction: column;
        text-transform: uppercase;
        font-family: 'Michroma';
        font-size: 12px;
        width: 120px;
    }

    .ship-info div div.data {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        line-height: 20px;
        min-width: 95px;
        margin-right: 85px;
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