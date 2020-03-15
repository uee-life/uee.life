<template>
    <main-panel title="Site News" class="site-news" id="site-news" :style="newsHeight">
        <div class="content">
            <template v-if="data.content">
                <template v-if="editing">
                    <div class="edit-button"><input type="button" @click="editing = false" value="CANCEL"></div>
                    <form class="edit" @submit.prevent="update">
                    <div>Title: <input class="titleInput" v-model="data.title"></div>
                    <div>Content:</div>
                    <textarea v-model="data.content" class="contentInput"></textarea>
                    <br />
                    <input type="submit" value="Update">
                    </form>
                </template>
                <template v-else>
                    <div class="edit-button" v-if="$auth.hasScope('write:site_content')"><input type="button" @click="() => {editing = true; if(!showing) toggleNews()}" value="EDIT"></div>
                    <div class="title">
                    <h1 v-if="data.title" v-text="data.title"></h1>
                    <div v-if="data.updated" class="date"><i>Updated: <span>{{ postedDate }}</span></i></div>
                    </div>
                    <div v-html="$md.render(data.content)"></div>
                </template>
            </template>
            <div class="read-more" @click="toggleNews()">{{buttonText}}</div>
        </div>
    </main-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
export default {
    data() {
        return {
            newsHeight: "height: 100px",
            buttonText: "Read More",
            showing: false,
            data: {
                title: null,
                content: "",
                updated: null
            },
            editing: false
        }
    },
    computed: {
        postedDate() {
        const d = new Date(this.data.updated);
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const date = new Date(year + 930, month, day).toDateString();
        return date
        }
    },
    methods: {
        toggleNews() {
            if(this.showing) {
                gsap.to(".site-news", {duration: 0.5, height: '100px'})
                //this.newsHeight = "height: 100px";
                this.buttonText = "Read More";
                this.showing = false;
            } else {
                gsap.fromTo(".site-news", {duration: 0.5, height: '100px'}, {height: 'auto'})
                this.buttonText = "Hide";
                this.showing = true;
            }
        },
        async getContent() {
            this.$axios({
                url: 'https://api.uee.life/content/site-news',
                method: 'GET'
            }).then((res) => {
                this.data = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        async update() {
            this.$axios({
                url: 'https://api.uee.life/content/site-news',
                method: 'PUT',
                headers: {
                'Content-type': 'application/json; charset=utf-8'
                },
                data: this.data
            }).then((res) => {
                this.$swal.fire('success', "Content Updated!", 'success')
                this.editing = false
                this.getContent()
            }).catch((error) => {
                this.$swal.fire('error', error, 'warning')
            })
        }
    },
    mounted() {
        this.getContent()
    }
}
</script>

<style>
    .site-news {
        display: flex;
        box-sizing: border-box;
        flex-grow: 1;
    }

    .site-news .title {
        margin-top: 25px;
        margin-bottom: 20px;
    }

    .site-news .title h1 {
        margin: 0px;
    }

    .site-news .title .date {
        font-size: 12px;
    }

    .site-news>.content {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
        margin-right: 10px;
    }

    .site-news>.content>h3 {
        word-spacing: 8px;
    }

    .site-news>.content>.read-more {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    .site-news>.content>.read-more:hover {
        color: #dbf3ff;
        cursor: pointer;
    }
        .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .edit {
      display: flex;
      flex-direction: column;
      margin: 20px;
    }

    .edit .titleInput {
      width: 100%;
    }

    .edit .contentInput {
      height: 400px;
    }
</style>