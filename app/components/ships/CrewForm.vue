<template>
    <form @submit.prevent="submit" class="crew-form">
        <template v-if="roleSelect">
        <label for="role">Select Role:</label>
        <input class="input" id="role" v-model="role" maxlength="20" placeholder="Crewmen"/>
        </template>
        <label for="citizen">Select Citizen:</label>
        <input class="input" id="citizen" @keyup.enter="getResults()" @input="autoGetResults()" v-model="search" placeholder="Citizen Search"/>
        <div v-if="result" class="results">
            <div v-for="res in result" :key="res.handle" :class="resultClass(res)" @click="selectResult(res)">
                <span class="thumb">
                    <img :src="res.portrait" />
                </span>
                <span class="identity">
                    <h2 class="name">{{res.name}}</h2>
                    <span class="symbol">{{res.handle}}</span>
                    <span v-if="res.org" class="org">Org: {{res.org}}</span>
                </span>
            </div>
        </div>
        <input type="submit" value="Submit" />
    </form>
</template>

<script>
export default {
    name: 'CrewForm',
    props: {
        roleSelect: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            search: "",
            result: null,
            handle: null,
            role: ""
        }
    },
    methods: {
        submit() {
            this.addCrew()
        },
        addCrew() {
            const crew = {
                handle: this.handle,
                role: this.role ? this.role : "Crewmen"
            }
            this.$emit('add', crew)
        },
        async autoGetResults() {
            if(this.search.length >= 3) {
                this.getResults()
            } else {
                this.result = null
            }
        },
        async getResults() {
            const data = {
                query: this.search
            }
            this.$axios({
                url: `https://api.uee.life/citizen/search`,
                method: 'POST',
                data: data
            }).then((res) => {
                console.log(res)
                this.result = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        selectResult(res) {
            console.log('selected', res)
            this.handle = res.handle
            this.search = res.handle
            this.getResults()
        },
        resultClass(res) {
            if (res.handle === this.handle) {
                return "result selected"
            } else {
                return "result"
            }
        }
    }
}
</script>

<style scoped>
    .crew-form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
    }
    input {
        margin: 2px;
    }
    .results {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }

    .result {
        margin: 5px;
        cursor: pointer;
        display: flex;
        box-sizing: border-box;
        height: 100%;
        align-items: center;
        background: url('/images/fading-bars.png') repeat;
        padding: 5px 10px;
        position: relative;
        height: fit-content;
        border: 1px solid #546f84;
        flex-grow: 1;
    }

    .result.selected {
        border: 1px solid green;
    }

    .result>.thumb {
        display: inline-block;
        width: 70px;
        height: 70px;
        position: relative;
        flex-shrink: 0;
    }

    .result>.thumb>img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        align-self: center;
    }

    .result>.identity {
        display: flex;
        line-height: 16px;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    .result>.identity>.org {
        font-size: 0.9rem;
        color: #739cb0;
        margin-top: 2px;
    }

    .result>.identity>.symbol {
        font-size: 0.9rem;
        color: #739cb0;
        margin-top: 2px;
    }

    .result>.right {
        display: none;
    }
</style>