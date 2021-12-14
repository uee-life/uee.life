<template>
    <main-panel class='wall-post'>
        <div class="header">
            <img class="portrait" :src="data.portrait"/>
            <div class="post-info">
                <div class="user">{{data.user}}</div>
                <div class="date">{{data.date}}</div>
            </div>
        </div>
        <div class="content">{{data.content}}</div>
    </main-panel>
</template>

<script>


export default {
    props: ['data'],
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