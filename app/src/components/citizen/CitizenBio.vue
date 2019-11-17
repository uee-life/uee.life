<template>
  <div class="citizen-bio" id="citizen-bio">
      Bio:
      <div class="bio">
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
        timeline.to(".bio .content", 1, {opacity: 1})
    }
}
</script>

<style scoped>
    .bio {
        display: block;
        position: relative;
        width: 50px;
        height: 50px;
        border: 1px solid grey;
        padding: 5px;
        background: url('/images/fading-bars.png') repeat;
        margin-bottom: 20px;
        opacity: 0;
    }
    .bio .content {
        display: flex;
        justify-content: flex-start;
        position: relative;
        height: 100%;
        opacity: 0;
        overflow: auto;
        align-self: flex-start;
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