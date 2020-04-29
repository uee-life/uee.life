<template>
    <form @submit.prevent="addFleet" class="fleet-form">
        <div>
            Name: <br />
            <input class="input" type="text" v-model="name" maxlength="16">
        </div>
        <div>
            Role:
            <input class="input" type="text" v-model="title">
        </div>
        <input type="submit" value="Add" />
    </form>
</template>

<script>
export default {
    name: 'FleetForm',
    props: ['shipPool'],
    data() {
        return {
            name: '',
            title: ''
        }
    },
    methods: {
        addFleet() {
            const fleet = {
                name: this.name,
                title: this.title
            }
            this.$emit('add', fleet)
        }
    }
}
</script>

<style>
.fleet-form {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 400px;
}
.fleet-form input, textarea {
    margin-bottom: 5px;
    width: 100%;
}
</style>