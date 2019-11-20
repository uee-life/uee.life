<template>
    <div :class="computedClass">
        <section-title v-if="title" :text="title" />
        <content :class="contentClass">
            <slot></slot>
        </content>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
    </div>
</template>

<script>
export default {
    name: 'dock-item',
    props: {
        title: {
            type: String,
            default: ""
        },
        mainClass: {
            type: String,
        },
        contentClass: {
            type: String,
            default: "content"
        }
    },
    computed: {
        computedClass() {
            return `dock-item ${this.mainClass}`
        }
    }
}
</script>

<style>
    .dock-item {
        position: relative;
        height: fit-content;
        width: 220px;
        min-width: 220px;
        margin-bottom: 20px;
        padding: 15px;
        background: url('/images/fading-bars.png') repeat;
    }
</style>