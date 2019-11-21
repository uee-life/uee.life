<template>
    <div class="citizen-bio" id="citizen-bio">
        <div class="bio">
            <section-title text="BIO" />
            <div class="content">{{ bio }}</div>
            <span class="corner top left"></span>
            <span class="corner top right"></span>
            <span class="corner bottom left"></span>
            <span class="corner bottom right"></span>
        </div>
    </div>
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
                
                timeline.to(".bio", 1, {width: "100%", height: "200px"})
                timeline.to(".bio .content", 1, {opacity: 1})
            }
        }
    },
    mounted() {
        const timeline = new TimelineLite()
        timeline.to(".bio", 1, {opacity: 1})
        timeline.to(".bio", 1, {width: "100%", height: "200px"})
        timeline.to(".bio .section-title", 0.5, {opacity: 1})
        timeline.to(".bio .content", 1, {opacity: 1})
    }
}
</script>

<style scoped>
    .bio {
        display: block;
        position: relative;
        width: 105px;
        height: 50px;
        border: 0px solid grey;
        border-top: none;
        padding: 5px;
        background: url('/images/fading-bars.png') repeat;
        margin-bottom: 20px;
        opacity: 0;
    }

    .bio .title {
        font-family: 'Michroma';
        position:absolute;
        left: 0;
        top:-13px;
        width: 100%;
        display: flex;
    }

    .bio .title-text {
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 40px;
        opacity: 0;
    }

    .bio .title .line-left {
        width: 40px;
        /*background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 49%, grey 50%, grey 52%, rgba(0,0,0,0) 53%, rgba(0,0,0,0) 100%);*/
    }

    .bio .title .line-right {
        flex-grow: 1;
        /*background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 49%, grey 50%, grey 51%, rgba(0,0,0,0) 52%, rgba(0,0,0,0) 100%);*/
    }

    .bio .content {
        display: flex;
        justify-content: flex-start;
        position: relative;
        height: 100%;
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