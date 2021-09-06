<template>
    <div class="org-main" id="org-main">
        <ship-list :isAdmin="$auth.hasScope('admin:all')" />
    </div>
</template>

<script>
import { gsap } from 'gsap'

import ShipForm from '@/components/admin/ships/ShipForm.vue'
import ShipList from '@/components/admin/ships/ShipList.vue'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    middleware: 'auth',
    name: "ships",
    components: {
        ShipList,
        ShipForm
    },
    data() {
        return {
            ships: [],
            search: ''
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .input-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .input-form span {
        width: 100%;
    }
</style>