<template>
    <div class="ship-summary" :title="ship.model">
        <img  @click="selected" :src="shipImage" />
        <img class="manufacturer" :src="manufacturerImage" />
        <div class="ship-info">
            <h5 @click="selected">{{ ship.model }}</h5>
            <div class="info">
                <div class="line-item"><span class="label">Ship &nbsp; ID:</span><span class="data">{{ ship.id }}</span></div>
                <div class="line-item"><span class="label">Type:</span><span class="data">{{ ship.type_text }} - {{ ship.focus_text }}</span></div>
                <div class="line-item"><span class="label">Crew:</span><span class="data">{{ ship.max_crew }}</span></div>
                <div class="line-item" v-for="t in Object.keys(ship.equipment)" :key="t">
                    <span class="label">{{t}}:</span> <span v-for="i in Object.keys(ship.equipment[t])" :key="i">
                        <span class="data" v-if="ship.equipment[t][i] > 0">{{ship.equipment[t][i]}}x{{i.toUpperCase()}} </span>
                    </span>
                </div>
                <div class="line-item"><span class="label">Points:</span><span class="data">{{shipPoints}}</span></div>
            </div>
        </div>
        <div class="mask" @click="$emit('selected', ship.id)"></div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
        <img v-if="isAdmin" title="Edit Ship" class="edit" @click="edit" src="~/assets/edit.png">
        <img v-if="isAdmin" title="Remove Ship" class="delete" @click="remove" src="~/assets/delete.png">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ship-summary',
    props: {
        ship: {
            type: Object,
            default: function() {
                return {}
            }
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            citizen: 'loggedCitizen'
        }),
        shipImage: function() {
            return `/images/ships/${this.ship.short_name}.jpg`
        },
        manufacturerImage: function () {
            return `/images/manufacturers/${this.ship.make_abbr}.png`
        },
        shipPoints: function () {
            const multipliers = {
                weapons: {
                    emp: 0.125,
                    s1: 1,
                    s2: 1.2,
                    s3: 1.5,
                    s4: 1.9,
                    s5: 2.4,
                    s6: 3,
                    s7: 3.7,
                    s8: 4.5,
                    s9: 5.4,
                    s10: 6.4
                },
                turrets: {
                    emp: 0,
                    s1: 1.25,
                    s2: 1.5,
                    s3: 2.875,
                    s4: 2.375,
                    s5: 3,
                    s6: 3.75,
                    s7: 4.625,
                    s8: 5.625,
                    s9: 6.75
                },
                missiles: {
                    r: 0.1,
                    s1: 0.1,
                    s2: 0.155,
                    s3: 0.34,
                    s4: 0.53,
                    s5: 0.84,
                    s6: 1.23,
                    s7: 1.62,
                    s8: 2.01,
                    s9: 2.4,
                    s10: 2.79,
                    s11: 3.18,
                    s12: 3.57
                },
                shields: {
                    s0: 1,
                    s1: 2,
                    s2: 4,
                    s3: 8,
                    s4: 16,
                    s5: 32,
                    s6: 64
                }
            }

            const perf_mods = {
                speed: {
                    weight: 1,
                    benchmark: 150
                },
                agility: {
                    weight: 2,
                    benchmark: 100
                }
            }

            let equip_score = 0
            let mobility_score = 0

            for (const [k, v] of Object.entries(this.ship.equipment)) {
                for (const [key, value] of Object.entries(v)) {
                    if (value > 0) {
                        equip_score += multipliers[k][key] * value
                    }
                }
            }

            const perf = this.ship.performance

            let speed_score = perf.speed / perf_mods.speed.benchmark
            let agility_score = (perf.pitch + perf.yaw + (perf.roll / 5)) / perf_mods.agility.benchmark
            mobility_score = (speed_score + agility_score) / 2

            let total_score = equip_score * mobility_score

            const scale_factor = 1.254390366

            let points = (total_score * this.ship.modifier) * scale_factor

            return points.toFixed(0)
        }
    },
    methods: {
        selected() {
            this.$emit('selected', this.ship)
        },
        remove() {
            console.log('remove clicked')
            this.$emit('remove', this.ship)
        },
        edit() {
            console.log('edit clicked')
            this.$emit('edit', this.ship)
        }
    }
}
</script>

<style scoped>
    .ship-summary img {
        max-width: 170px;
        flex-basis: 90%;
        flex-grow: 1;
        align-self: flex-start;
    }

    .ship-summary {
        display: flex;
        flex-basis: 400px;
        flex-grow: 1;
        margin: 5px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-left: 1px solid #546f84;
        border-right: 1px solid #546f84;
    }

    .ship-summary .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
    }

    .ship-info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-top: -10px;
        z-index: 2;
        flex-grow: 1;
    }

    .ship-info .info {
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }

    .ship-info .info .line-item {
        display: flex;
    }

    .ship-info .info .line-item .label {
        width: 100px;
        text-transform: uppercase;
        font-family: 'Michroma';
        flex-shrink: 0;
    }

    .ship-info .info .line-item .data {
        margin-left: 5px;
        font-size: 14px;
        line-height: 19.5px;
        color: #dbf3ff;
    }

    .ship-info>h5 {
        font-size: 14px;
    }

    .manufacturer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        opacity: 0.8;
    }

    .ship-summary .delete {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        z-index: 20;
        cursor: pointer;
    }

    .ship-summary .edit {
        position: absolute;
        top: 5px;
        right: 30px;
        width: 20px;
        height: 20px;
        z-index: 20;
        cursor: pointer;
    }
</style>