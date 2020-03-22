<template>
    <ship :id="ship_id" />
</template>

<script>
import Ship from '@/components/ships/Ship'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    data () {
        return {
            ship_id: this.parseID(this.$route.params.id)
        }
    },
    components: {
        Ship
    },
    methods: {
        parseID(ship_id) {
            return parseInt(ship_id.split('-')[1], 16)
        }
    }
}
</script>

<style>

</style>