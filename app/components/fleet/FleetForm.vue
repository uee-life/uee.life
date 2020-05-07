<template>
    <form @submit.prevent="submit" class="fleet-form">
        <div>
            Name: <br />
            <input class="input" type="text" v-model="name" maxlength="16">
        </div>
        <div>
            Purpose:
            <input class="input" type="text" v-model="purpose">
        </div>
        <input type="submit" value="Submit" />
    </form>
</template>

<script>
export default {
    name: 'FleetForm',
    props: {
        group: {
            type: Object,
            default: function () {
                return null
            }
        }
    },
    data() {
        return {
            name: '',
            purpose: ''
        }
    },
    methods: {
        submit() {
            if (this.group) {
                this.updateFleet()
            } else {
                this.addFleet()
            }
        },
        addFleet() {
            const fleet = {
                name: this.name,
                purpose: this.purpose
            }
            this.$emit('add', fleet)
        },
        updateFleet() {
            const fleet = {
                name: this.name,
                purpose: this.purpose
            }
            this.$emit('update', fleet)
        }
    },
    mounted() {
        if (this.group) {
            this.name = this.group.name
            this.purpose = this.group.purpose
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