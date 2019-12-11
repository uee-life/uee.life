<template>
    <div :class="computedClass">
        <section-title v-if="title" :text="title" size="medium" />
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
    name: 'main-panel',
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
        margin-bottom: 20px;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>