<template>
    <div>
        Admin Page
        <poi-edit v-if="pois.length > 0" :poi="pois[0]"/>
    </div>
</template>

<script>
import PoiTable from '@/components/admin/POITable'
import PoiEdit from '@/components/admin/POIEdit'
import axios from 'axios'

export default {
    data() {
        return {
            pois: []
        }
    },
    components: {
        PoiTable,
        PoiEdit
    },
    methods: {
        getPOIs() {
            axios({
                url: 'https://api.uee.life/pois',
                method: 'GET'
            }).then((res) => {
                this.pois = res.data
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.getPOIs()
    }
}
</script>

<style>

</style>