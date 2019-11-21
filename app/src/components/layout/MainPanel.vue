<template>
    <div :class="computedClass">
        <section-title v-if="title" :text="title" size="large" />
        <div :class="contentClass">
            <slot></slot>
        </div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
    </div>
</template>

<script>
export default {
    name: 'org-history',
    props: {
        title: {
            type: String,
            default: ""
        },
        mainClass: {
            type: String,
            default: ""
        },
        contentClass: {
            type: String,
            default: "content"
        }
    },
    computed: {
        computedClass() {
            return `main-panel ${this.mainClass}`
        }
    }
}
</script>

<style>
    .main-panel {
        display: block;
        position: relative;
        padding: 15px;
        padding-top: 20px;
        margin-bottom: 20px;
        background: url('/images/fading-bars.png') repeat;
    }
</style>