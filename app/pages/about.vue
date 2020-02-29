<template>
  <div class="about">
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
        <div class="edit-button" v-if="$auth.hasScope('write:site_content')"><input type="button" @click="editing = true" value="EDIT"></div>
        <div class="title">
          <h1 v-if="data.title" v-text="data.title"></h1>
          <div v-if="data.updated" class="date"><i>Updated: <span>{{ postedDate }}</span></i></div>
        </div>
        <div v-html="$md.render(data.content)"></div>
      </template>
    </template>
    <template v-else>
      <div class="loading">
        <img src="~/assets/loading.gif" >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  name: 'about',
  data() {
    return {
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
    async getContent() {
      this.$axios({
        url: 'https://api.uee.life/content/about',
        method: 'GET'
      }).then((res) => {
        this.data = res.data
      }).catch((err) => {
        console.error(err)
      })
    },
    async update() {
      this.$axios({
        url: 'https://api.uee.life/content/about',
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

<style scoped>
    .about {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
        margin-right: 10px;
    }

    .title {
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .title h1 {
        margin: 0px;
        font-size: calc(20px + (24 - 20) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
    }

    .title .date {
        font-size: 12px;
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