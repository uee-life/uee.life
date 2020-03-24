<template>
    <form @submit.prevent="addCrew" class="ship-form">
        <input class="search-input" @keyup.enter="getResults()" @input="autoGetResults()" v-model="input" placeholder="Citizen Handle"/>
        <div v-if="result" class="results">
            <div v-for="res in result" :key="res.handle" class="result" @click="addCrew(res.handle)">
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
    </form>
</template>

<script>
export default {
    name: 'CrewForm',
    data() {
        return {
            input: "",
            result: null,
            handle: null,
            role: null
        }
    },
    methods: {
        addCrew(handle) {
            const crew = {
                handle: handle,
                role: this.role
            }
            this.$emit('add', crew)
        },
        async autoGetResults() {
            if(this.input.length >= 3) {
                this.getResults()
            } else {
                this.result = null
            }
        },
        async getResults() {
            const data = {
                query: this.input
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
        async getRoles() {

        }
    },
    mounted() {
        this.getRoles()
    }
}
</script>

<style scoped>
.ship-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}
input {
    margin-bottom: 5px;
}
    .search-input {
        width: calc(100% - 40px);
    }
    .results {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }
    .result {
        display: flex;
        flex-grow: 1;
        margin: 5px;
        cursor: pointer;
    }

    .result {
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