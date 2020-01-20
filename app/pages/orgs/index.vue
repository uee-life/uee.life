<template>
    <div class="search-main">
        <portal to="leftDock">
            <dock-item title="find orgs" mainClass="search-box">
                <input class="search-input" @keyup.enter="getResults()" v-model="input" placeholder="Org Handle"/>
            </dock-item>
        </portal>
        <div v-if="result" v-html="result" class="results">
        </div>
        <div v-else class="no-results">
            <span class="text big">
                No Results
                <div class="endcap left"></div>
                <div class="endcap right"></div>
            </span>
            <span class="text small">Use the box on the left to search</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    name: 'search-main',
    data() {
        return {
            result: "",
            input: ""
        }
    },
    methods: {
        async getResults() {
            try {
                const { data } = await axios.get('https://api.uee.life/search/org', {
                    params: {
                    sort: "default",
                    search: this.input,
                    commitment: [],
                    roleplay: [],
                    size: [],
                    model: [],
                    activity: [],
                    language: [],
                    recruiting: [],
                    pagesize: 12,
                    page: 1
                    }
                })
                this.result = data.data.html
                    .replace(/\/media/g, 'https://robertsspaceindustries.com/media')
                    .replace(/\/rsi/g, 'https://robertsspaceindustries.com/rsi')
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        }
    }

}
</script>

<style>
    .search-main {
        position: relative;
        width: 100%;
        padding: 10px;
        padding-top: 20px;
        margin-top: 30px;
    }

    .no-results {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .no-results>.text {
        position: relative;
        width: fit-content;
        padding-left: 20px;
        padding-right: 20px;
        margin: 20px;
    }

    .no-results>.text.big {
        font-family: 'Michroma';
        font-size: 25px;
    }

    .search-box .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .search-box .search-input {
        margin: 5px;
    }

    .search-box .search-button {
        margin: 5px;
    }
    .results {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }
    .org-cell {
        display: flex;
        flex-grow: 1;
        margin: 5px;
    }

    .org-cell>a {
        display: flex;
        align-items: center;
        background: url('/images/fading-bars.png') repeat;
        padding: 20px;
        position: relative;
        height: fit-content;
        border: 1px solid #546f84;
        flex-grow: 1;
    }

    .org-cell>a>.left {
        display: flex;
    }

    .org-cell>a>.left>.thumb {
        display: inline-block;
        width: 70px;
        height: 70px;
        position: relative;
    }

    .org-cell>a>.left>.thumb>img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .org-cell>a>.left>.identity {
        display: flex;
        line-height: 16px;
        max-width: 250px;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    .org-cell>a>.left>.identity>h3 {
        font-size: 14px;
        color: #dbf3ff;
        margin: 0;
    }

    .org-cell>a>.left>.identity>.symbol {
        font-size: 11px;
        color: #739cb0;
    }

    .org-cell>a>.right {
        display: none;
    }

</style>