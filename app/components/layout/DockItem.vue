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
        padding: 15px 10px;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>