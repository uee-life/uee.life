<template>
    <main-panel class="citizen-bio" title="bio" titleSize="small" contentClass="content">
        {{bio}}
    </main-panel>
</template>

<script>
import { TimelineLite } from 'gsap'

export default {
    name: "citizen-bio",
    props: ["bio"],
    watch: {
        'citizen.info': {
            handler: function() {
                const timeline = new TimelineLite()
                
                timeline.to(".citizen-bio", 1, {width: "100%", height: "200px"})
                timeline.to(".citizen-bio .content", 1, {opacity: 1})
            }
        }
    },
    mounted() {
        const timeline = new TimelineLite()
        timeline.to(".citizen-bio", 1, {opacity: 1})
        timeline.to(".citizen-bio", 0.6, {width:"100%"})
        timeline.to(".citizen-bio .content", 0.6, {width: "100%", height: "200px"})
        timeline.to(".citizen-bio .content", 1, {opacity: 1}) 
    }
}
</script>

<style>
    .citizen-bio {
        display: block;
        box-sizing: border-box;
        position: relative;
        min-width: 105px;
        min-height: 50px;
        width: fit-content;
        height: fit-content;
        border-top: none;
        padding: 5px;
        margin-bottom: 20px;
        opacity: 0;
    }

    .citizen-bio .content {
        display: flex;
        justify-content: flex-start;
        position: relative;
        height: 50px;
        width: 105px;
        opacity: 0;
        overflow: auto;
        align-self: flex-start;
        margin-top: 10px;
    }

    /* width */
    ::-webkit-scrollbar {
    width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
</style>