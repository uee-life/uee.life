<template>
    <div id="fleet-view" class="fleet-view">
        <div>Fleet:</div>
        <div class="ships">
        <ship-summary v-for="s in ships" :key="s.id" :ship="s">
        </ship-summary>
        </div>
    </div>
</template>

<script>
import ShipSummary from '@/components/fleet/ShipSummary.vue'

export default {
    name: "fleet-view",
    components: {
        ShipSummary
    },
    data() {
        return {
            ships: [
                {
                    id: 1,
                    manufacturer: "Anvil",
                    make: "Hornet",
                    model: "F7c",
                    name: "Bulldog",
                    size: "Light",
                    crew: 8
                },
                {
                    id: 2,
                    manufacturer: "Aegis",
                    make: "Avenger",
                    model: "Titan",
                    name: "Guppy",
                },
                {
                    id: 3,
                    manufacturer: "RSI",
                    make: "Constellation",
                    model: "Phoenix",
                    name: "Shark",
                },
                {
                    id: 4,
                    manufacturer: "RSI",
                    make: "Constellation",
                    model: "Aquila",
                    name: "Grog",
                },
                {
                    id: 5,
                    manufacturer: "Aegis",
                    make: "Avenger",
                    model: "Titan Renegade",
                    name: "Penguin",
                },
                {
                    id: 6,
                    manufacturer: "Aegis",
                    make: "Gladius",
                    model: "",
                    name: "Jester",
                },
            ]
        }
    }
}
</script>

<style>
    .ships {
        display: flex;
        flex-wrap: wrap;
    }
</style>