<template>
    <div class="org-members">
        <div v-if="members" class="results">
            <div v-for="member in members" :key="member.handle" class='org-cell'>
                <router-link :to="citizenLink(member.handle)">
                    <div class="left">
                        <div class="identity">
                            <h3>{{member.handle}}</h3>
                            <span class="symbol"><img class="star" src="@/assets/star.png" v-for="n in parseInt(member.stars)" :key="n"></span>
                        </div>
                    </div>
                </router-link>
            </div>
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
export default {
    name: 'org-members',
    props: ['members'],
    methods: {
        citizenLink(handle) {
            return `/citizens/${handle}`
        }
    }
}
</script>

<style scoped>
    .org-cell {
        display: flex;
        flex-grow: 1;
        margin: 5px;
    }

    .org-cell>a {
        display: flex;
        align-items: center;
        justify-content: center;
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
        margin: 0;
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

    .org-cell>a>.left>.identity>.symbol>.star {
        width: 20px;
        margin-bottom: -10px;
    }
</style>
