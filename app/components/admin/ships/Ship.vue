<template>
    <div>
        <div class="ship-info">
            <main-panel v-if="ship" title="Hull Info" class="info-panel">
                <div class="info-item">
                    <span class="label">Manufacturer:</span>
                    <span class="value">{{ ship.make }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Model:</span>
                    <span class="value">{{ ship.model }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Size:</span>
                    <span class="value">{{ ship.size }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Role:</span>
                    <span class="value">{{ `${ship.type} - ${ship.focus}` }}</span>
                </div>
            </main-panel>
            <main-panel v-if="ship" title="Metrics" class="info-panel">
                <div class="info-item">
                    <span class="label">Max Crew:</span>
                    <span class="value">{{ ship.max_crew }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Max Cargo:</span>
                    <span class="value">{{ ship.cargo }}</span>
                </div>
            </main-panel>
        </div>
    </div>
</template>

<script>
import ShipBanner from '@/components/ships/ShipBanner'
import CrewList from '@/components/ships/CrewList'
import FleetPanel from '@/components/fleet/FleetPanel'

export default {
    props: {
        ship: {
            type: Object,
            required: true,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            name: '',
            edit: {
                name: false
            }
        }
    },
    components: {
        ShipBanner,
        CrewList,
        FleetPanel
    },
    computed: {
        user() {
            return this.$auth.user
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>

<style>
.ship-info {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
}
.info-panel {
      flex-basis: 250px;
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 15px;
      flex-grow: 1;
}

.info-item {
    display: flex;
    margin-left: 15px;
}

.info-item .label {
    width: 110px;
}

.info-item .value .edit {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
}

.info-item .value .save {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
}

.info-item .value .cancel {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 30px;
    cursor: pointer;
}

.owner {
    display: flex;
    justify-content: center;
}

    .org-info .info .info-panel {
      flex-basis: 250px;
      margin-left: 10px;
      margin-right: 10px;
      flex-grow: 1;
    }
</style>