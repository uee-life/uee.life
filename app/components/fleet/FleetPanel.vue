<template>
    <main-panel v-if="fleet" class="fleet-panel">
        <section-title :text="fleet.name" />
        <div class="info">
            <div class="info-item"><span class="label">Purpose:</span><span class="value">{{ fleet.purpose }}</span></div>
            <div class="info-item"><span class="label">Commander:</span><span v-if="fleet.cmdr" class="value">{{ fleet.cmdr }}</span><span v-else class="value">Unassigned</span></div>
        </div>
        <div class="mask" @click="clicked(fleet.id)"></div>
    </main-panel>
</template>

<script>
export default {
    name: "FleetPanel",
    props: {
        fleetID: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            fleet: null
        }
    },
    methods: {
        loadFleet() {
            this.loading = true
            this.$axios({
                url: `https://api.uee.life/fleets/${this.fleetID}`,
                method: 'GET'
            }).then(async (res) => {
                if (res.data.id && res.data.parent === 0) {
                    this.fleet = res.data
                    this.loading = false
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        clicked() {
            this.$router.push(`/fleet/${this.fleetID}`)
        }
    },
    mounted() {
        this.loadFleet()
    }
}
</script>

<style scoped>
.fleet-panel {
    display: flex;
    flex-grow: 1;
    margin: 20px 10px 0;
    padding: 9px;
    position: relative;
    background: url('/images/fading-bars.png') repeat;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-left: 1px solid #546f84;
    border-right: 1px solid #546f84;
}

.fleet-panel .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
}

.fleet-panel .fleet-cmdr {
    margin: 15px 0 0 15px;
}

.fleet-panel .info .info-item {
    display: flex;
}

.fleet-panel .info .info-item .label {
    width: 100px;
}

.fleet-panel .info .info-item .value {
    color: #dbf3ff;
}
</style>