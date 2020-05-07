<template>
    <div class="fleet-ship">
        <ship :id="ship_id" :fleet="parseInt(this.$route.params.id)" :cmdrs="cmdrs"/>
    </div>
</template>

<script>
import Ship from '@/components/ships/Ship'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    data () {
        return {
            ship_id: this.parseID(this.$route.params.shipID),
            ship: null,
            cmdrs: []
        }
    },
    components: {
        Ship
    },
    methods: {
        parseID(ship_id) {
            return parseInt(ship_id.split('-')[1], 16)
        },
        getFleetShip() {
            this.$axios({
                url: `/fleets/${this.$route.params.id}/ships/${this.parseID(this.$route.params.shipID)}`,
                method: 'GET'
            }).then((res) => {
                this.ship = res.data
                this.getCmdrs()
            }).catch((err) => {
                console.error(err)
            })
        },
        getCmdrs() {
            this.$axios({
                url: `/fleets/${this.ship.parent}/commanders`,
                method: 'GET'
            }).then((res) => {
                this.cmdrs = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
    },
    mounted() {
        this.getFleetShip()
    }
}
</script>

<style>

</style>