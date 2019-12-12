<template>
    <form>
        <select v-model="system">
            <option value="">Not Specified</option>
            <option v-for="sys in systems" :key="sys.id" value="sys.id">{{sys.name}}</option>
        </select>
    </form>
</template>

<script>
export default {
    name: 'home-select',
    data() {
        return {
            system: '',
            systems: [],
            planet: '',
            planets: [],
            home: '',
            pois: []
        }
    }
}
</script>

<style>

</style>