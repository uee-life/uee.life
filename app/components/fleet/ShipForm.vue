<template>
    <form @submit.prevent="addShip" class="ship-form">
        <div>
            Make: 
            <select v-model="make">
                <option disabled value="">Select Make</option>
                <option v-for="m in makes" :key="m.id" :value="m.name">{{ m.name }}</option>
            </select>
        </div>
        <div>
            Model:
            <select v-model="ship">
                <option disabled value="">Select Model</option>
                <option v-for="s in filteredShips" :key="s.id" :value="s">{{ s.model }}</option>                
            </select>
        </div>
        <div>Name: <input type="text" v-model="name"> (optional)</div>
        <input type="submit" value="Add" />
    </form>
</template>

<script>
export default {
    name: 'shipForm',
    data() {
        return {
            ship: null,
            ships: [],
            makes: null,
            make: "Origin",
            name: ""

        }
    },
    computed: {
        filteredShips() {
            return this.ships.filter(ship => {
                return ship.make_text.toLowerCase().includes(this.make.toLowerCase())
            })
        }
    },
    methods: {
        addShip() {
            const ship = {
                id: this.ship.id,
                name: this.name
            }
            this.$emit('add', ship)
        },
        getShips() {
            this.$axios({
                url: 'https://api.uee.life/ships',
                method: 'GET'
            }).then((res) => {
                this.ships = res.data.ships
                this.makes = res.data.makes
            }).catch((err) => {
                console.error(err)
            })
        }
    },
    mounted() {
        this.getShips()
    }
}
</script>

<style>
.ship-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}
input {
    margin-bottom: 5px;
}
</style>