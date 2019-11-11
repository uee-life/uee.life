<template>
    <div class="org">
        <fleet-view :ships="ships" />
    </div>
</template>

<script>
import FleetView from "@/components/fleet/FleetView.vue"

export default {
    name: "org",
    components: {
        FleetView
    },
    data() {
        return {
            ships: [
                    {
                    id: 1,
                    manufacturer: "Anvil",
                    make: "Hornet",
                    model: "F7a",
                    name: "Bulldog",
                    size: "Light",
                    crew: 8
                },
                {
                    id: 2,
                    manufacturer: "Aegis",
                    make: "Avenger",
                    model: "Titan",
                    name: "Penguin",
                },
                {
                    id: 3,
                    manufacturer: "RSI",
                    make: "Constellation",
                    model: "Phoenix",
                    name: "Shark",
                }
                ]
        }
    }
}
</script>

<style>
    .org-main {
        position: relative;
        min-width: 500px;
        flex-basis: 500px;
        flex-grow: 1;
        padding: 10px;
    }
</style>