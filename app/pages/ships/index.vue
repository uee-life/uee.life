<template>
  <div class='ship-results'>
      Ship Search coming soon...
  </div>
</template>

<script>

export default {
    layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
    asyncData() {
        return {
            result: "",
            input: ""
        }
    },
    methods: {
        async getResults() {
            this.$axios({
                url: `https://api.uee.life/citizens/${this.input}/info`,
                method: "GET"
            }).then((data) => {
                if(data.error) {
                    this.result = '<div class="no-results"><span class="text big">No Results<div class="endcap left"></div><div class="endcap right"></div></span><span class="text small">That citizen was not found!</span></div>'
                } else {
                    console.log('Data: ', data)
                    this.result = data.data
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    },
    computed: {
        shipLink() {
            return `/ships/${this.result.id}`;
        }
    }
}
</script>

<style scoped>
    .citizen-results {
        position: relative;
        width: 100%;
        padding: 10px;
        padding-top: 20px;
    }

    .no-results {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .no-results>.text {
        position: relative;
        width: fit-content;
        padding-left: 20px;
        padding-right: 20px;
        margin: 20px;
    }

    .no-results>.text.big {
        font-family: 'Michroma';
        font-size: 25px;
    }

    .search-box .content .search-input {
        margin: 5px;
        width: calc(100% - 10px);
        box-sizing: border-box;
    }

    .search-box .search-button {
        margin: 5px;
    }
    .results {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }
    .org-cell {
        display: flex;
        flex-grow: 1;
        margin: 5px;
    }

    .org-cell>a {
        display: flex;
        align-items: center;
        background: url('/images/fading-bars.png') repeat;
        padding: 20px;
        position: relative;
        height: fit-content;
        border: 1px solid #546f84;
        flex-grow: 1;
    }

    .org-cell>a>.left {
        display: flex;
    }

    .org-cell>a>.left>.thumb {
        display: inline-block;
        width: 70px;
        height: 70px;
        position: relative;
    }

    .org-cell>a>.left>.thumb>img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .org-cell>a>.left>.identity {
        display: flex;
        line-height: 16px;
        max-width: 250px;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    .org-cell>a>.left>.identity>h3 {
        font-size: 21px;
        color: #dbf3ff;
        margin: 0;
        letter-spacing: 2px;
    }

    .org-cell>a>.left>.identity>.org {
        font-size: 15px;
        color: #739cb0;
        margin-top: 15px;
    }

    .org-cell>a>.left>.identity>.symbol {
        font-size: 15px;
        color: #739cb0;
        margin-top: 3px;
    }

    .org-cell>a>.right {
        display: none;
    }

    .no-decor {
        text-decoration: none;
    }

</style>