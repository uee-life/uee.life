<template>
    <dock-item class="giveaway" title="Monthly Giveaway">
        <img src="~assets/GiftCard10.png" @click="showGiveaway = true"/>
        <modal v-if="showGiveaway" title="Montly Giveaway" @close="showGiveaway = false">
            <div class="giveaway-message">
                <p>One lucky active and verified citizen will win a $10 RSI Gift Card each and every month!</p>
                <p>Winners are notified via email at the end of the month. Make sure you log in regularly to have a chance at winning!</p>
            </div>
        </modal>
    </dock-item>
</template>

<script>
import Gsap from 'gsap'

export default {
    name: 'made-by',
    data () {
        return {
            showGiveaway: false
        }
    },
    mounted() {
        Gsap.to('.giveaway', {delay: 0.5, duration: 1, opacity: 1})
    }
}
</script>

<style>
    .giveaway {
        opacity: 0;
        display: flex;
        justify-content: center;
    }
    .giveaway img {
        width: 220px;
        cursor: pointer;
    }
    .giveaway-message {
        margin: 15px 10px;
        text-align: center;
    }
</style>