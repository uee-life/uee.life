<template>
    <main-panel class='wall-post'>
        <div class="header">
            <img class="portrait" :src="data.portrait"/>
            <div class="post-info">
                <div class="user">{{data.user}}</div>
                <div class="date">{{fuzzydate}} ago - {{data.visibility}}</div>
            </div>
        </div>
        <div class="content">{{data.content}}</div>
        <div class="likes">{{data.likes}} likes</div>
    </main-panel>
</template>

<script>
import { formatDistance, formatRelative } from 'date-fns'

export default {
    props: ['data'],
    computed: {
        fuzzydate() {
            return formatDistance(this.data.date, new Date())
        }
    }
}
</script>

<style>
    .wall-post>.header {
        display: flex;
    }
    .wall-post>.content {
        margin: 5px;
    }
    .wall-post>.header>.portrait {
        width: 50px;
        margin: 5px;
        border-radius: 2rem;
    }
    .wall-post>.header>.post-info {
        display: block;
        margin: 5px;
    }
    .post-info>.user {
        font-weight: bold;
    }
    .post-info>.date {
        font-size: 12px;
    }
</style>