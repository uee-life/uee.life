<template>
    <div class="fleet-summary">
        <main-panel title="Summary">
            <div class="view-controls">
                <div class="display-style">
                    <template v-if="!isMobile">
                        Summarize by: 
                            <a @click="summarize('type')">type</a> | 
                            <a @click="summarize('focus')">focus</a> | 
                            <a @click="summarize('make')">make</a> | 
                            <a @click="summarize('model')">model</a> | 
                            <a @click="summarize('size')">size</a> | 
                    </template>
                </div>
            </div>
            Summary by {{ summary_type }}:
            <div class="summaries">
                <ul v-if="summary"><li v-for="(val, key) in summary" :key="key">{{key}} - {{val}}</li></ul>
            </div>
            <div>Total Ships: {{ fleet.length }}</div>
        </main-panel>
    </div>
</template>

<script>
export default {
    name: "FleetSummary",
    props: {
        fleet: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            summary_type: 'type',
            summary: {}
        }
    },
    methods: {
        summarize(type) { 
            this.summary_type = type
            this.summary = {}
            for(var i in this.fleet) {
                const ship = this.fleet[i]
                if(!Object.keys(this.summary).includes(ship[type])) {
                    this.summary[ship[type]] = 1
                } else {
                    this.summary[ship[type]] += 1
                }
            }
        },
        filterBy(type) {
            
        }
    },
    mounted() {
        this.summarize('type')
    }
}
</script>

<style>
.summaries {
    display: flex;
    flex-wrap: wrap;
}
</style>