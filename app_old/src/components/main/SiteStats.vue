<template>
    <dock-item title="Site Stats" mainClass="site-stats">
      <div v-if="stats" class="citizen-stats">
        Users:
        <ul>
        <li>Registered: <span class="stat">{{stats.users.total}}</span></li>
        <li>Active: <span class="stat">{{stats.users.active}}</span></li>
        <li>Verified: <span class="stat">{{stats.users.verified}}</span></li>
        </ul>
      </div>
    </dock-item>
</template>

<script>
import { TimelineLite } from "gsap"

export default {
    name: "site-stats",
    props: ["stats"],
    data() {
        return {
        }
    },
    watch: {
      stats() {
        const timeline = new TimelineLite()

        timeline.to(".site-stats", 1, {opacity: 1})
      }
    }
}
</script>

<style>
  .site-stats {
    opacity: 0;
    transition-property: all;
  }

  .site-stats .content div {
    display: flex;
    flex-direction: Column;
    align-items: flex-start;
    opacity: 1;
  }

  .citizen-stats ul {
    list-style-type: none;
  }

  .citizen-stats li {
    margin-left: -5px;
  }

  .citizen-stats .stat {
    color: #dbf3ff;
  }

  .stat-header {
    margin: 5px;
  }
</style>