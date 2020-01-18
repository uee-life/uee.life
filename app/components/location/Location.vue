<template>
    <div class="location">
        <main-panel mainClass="location-panel">
            <div class="location-info">
                <h3 class="title"> {{ location.name }}</h3>
                <p>
                    <span v-if="location.subtype">Type: <span class='value'>{{location.subtype}}</span><br></span>
                    <span v-if="location.affiliation">Affiliation: <span class='value'>{{location.affiliation}}</span><br></span>
                    <span v-if="location.habitable">Habitable: <span class='value'>{{isHabitable}}</span><br></span>
                    <span v-if="location.population">Population: <span class='value'>{{rating(location.population)}}</span><br></span>
                    <span v-if="location.danger">Risk: <span class='value'>{{rating(location.danger)}}</span><br></span>
                </p>
                <p>{{ location.description }}</p>
            </div>
            <img class="location-image" v-if="location.thumbnail" :src="location.thumbnail"/>
        </main-panel>
        <slot></slot>
        <div v-if="debug">{{ JSON.stringify(location, null, 2) }}</div>
    </div>
</template>

<script>
import { gsap } from "gsap"

export default {
    name: 'location',
    props: ['location', 'type'],
    data() {
        return {
            tabs: ["info", "fleet", "members"],
            initialTab: "info",
            debug: false
        }
    },
    components: {
    },
    computed: {
        mainTitle() {
            return `${this.location.name} ${this.type} ( ${this.location.affiliation} )`
        },
        isHabitable() {
            if(this.location.habitable) {
                return 'Yes'
            } else {
                return 'No'
            }
        }
    },
    methods: {
        rating(metric) {
            if(metric >= 9) {
                return "Extreme"
            } else if(metric >= 7) {
                return "Very High"
            } else if(metric >= 5) {
                return "Medium"
            } else if(metric >= 3) {
                return "Low"
            } else if(metric >= 1) {
                return "Very Low"
            } else {
                return "None"
            }
        }
    },
    watch: {
        location: {
            handler: function() {
                gsap.to(".location", 1, {opacity: 1})
                //timeline.to(".portrait", 1, {width: "150px", height: "150px"})
                //timeline.to(".portrait img", 0.5, {opacity: 1})
                //timeline.to(".citizen-info .info", 0.5, {opacity: 1})
            }
        }
    }
}
</script>

<style>
    .location {
        width: 100%;
        opacity: 0;
    }

    .location-panel .content {
        display: flex;
    }

    .location-image {
        flex-basis: 300px;
        height: 300px;
        border: 1px dotted #546f84;
    }

    .location-info {
        margin-bottom: 30px;
        margin: 0 20px;
    }

    .location-info .title {
        letter-spacing: 1.5px;
        word-spacing: 3px;
        margin: 10px 0;
    }

    .location-info .value {
        color: #dbf3ff;
    }
</style>