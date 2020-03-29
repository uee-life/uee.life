<template>
    <div v-if="citizen" :class="portraitSize">
        <nuxt-link :to="citizenLink">
            <img class="image" :src="citizen.portrait" />
            <img v-if="citizen.verified" class="verified" src="~assets/verified.png" />
        </nuxt-link>
        <div v-if="showName" class="name">
            {{ citizen.name }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
    props: {
        handle: {
            type: String
        },
        size: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['small', 'medium'].indexOf(value) !== -1
            }
        },
        showName: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            citizen: null
        }
    },
    methods: {
        async getCitizen(handle) {
            console.log('loading portrait for: ', handle)
            this.$axios({
                url: `https://api.uee.life/citizens/${handle}/info`,
                method: 'GET'
            }).then((res) => {
                this.citizen = res.data
            }).catch((error) => {
                // eslint-disable-next-line
                console.error(error)
            });
        }
    },
    computed: {
        portraitSize() {
            return `portrait ${this.size}`
        },
        citizenLink() {
            return `/citizens/${this.citizen.handle}`
        }
    },
    watch: {
        handle: {
            handler: function () {
                if(this.handle) {
                    this.getCitizen(this.handle).then(() => {
                        this.$emit('finished')
                    })
                }
            }
        }
    },
    async mounted () {
        if(this.handle) {
            this.getCitizen(this.handle).then(() => {
                this.$emit('finished')
            })
        }
    }
}
</script>

<style scoped>
    .portrait {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .portrait a {
        width: 100%;
    }

    .portrait.medium {
        width: 165px;
        flex-basis: 165px;
        height: fit-content;
    }

    .portrait.small {
        width: 100px;
        min-height: 100px;
        height: fit-content;
    }

    .portrait .image {
        box-sizing: border-box;
        width: 100%;
        vertical-align: middle;
    }

    .portrait.medium .verified {
        position: absolute;
        bottom: 0;
        right: 3px;
        top: 118px;
        width: 45px;
    }

    .portrait.small .verified {
        position: absolute;
        top: 68px;
        right: 0px;
        width: 30px;
    }

    .portrait.medium .name {
        font-size: 16px;
        text-align: center;
    }
    .portrait.small .name {
        font-size: 12px;
        text-align: center;
    }
</style>