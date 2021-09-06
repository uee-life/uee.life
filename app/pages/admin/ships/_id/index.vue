<template>
    <ship :ship="ship_id" />
</template>

<script>
import Ship from '@/components/admin/ships/Ship'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    data () {
        return {
            ship_id: this.$route.params.id
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