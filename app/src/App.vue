<template>
  <div id="app" class="container">
    <link href="//fonts.googleapis.com/css?family=Electrolize|Orbitron:400,500,700|Share+Tech+Mono" rel="stylesheet" type="text/css">
    <!--img alt="Vue logo" src="@/assets/logo.png"-->
    <main-header />
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'app',
  components: {
    MainHeader,
    NavBar
  },
  data() {
    return {
      location: {}
    }
  },
  mounted() {
    this.getLocation("Daymar")
  },
  methods: {
    async getLocation(location) {
      try {
        const response = await fetch('https://www.capnflint.com:4444/stargps/location?foobar', {
          method: 'POST',
          body: JSON.stringify({query: location}),
          headers: { 'Content-type': 'application/json; charset=UTF-8'}
        })
        const data = await response.json()
        this.location = data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error) 
      }
    },
    async addEmployee(employee) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(employee),
          headers: { 'Content-type': 'application/json; charset=UTF-8'}
        })
        const data = await response.json()
        this.employees = [...this.employees, data]
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    async deleteEmployee(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE"
        });
        this.employees = this.employees.filter(employee => employee.id !== id);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    async editEmployee(id, updatedEmployee) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedEmployee),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const data = await response.json()
        this.employees = this.employees.map(employee => (employee.id === id ? data : employee))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>

<style>
body {
        background: black;
        color: gainsboro;
    }
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: 'Electrolize';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #39ced8;
  text-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
  padding: 0;
  background: url("./assets/gridbg_glow.png") repeat center top;
}
.container::after {
  position: fixed;
  content: "";
  background: url("./assets/nebula.jpg") repeat;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
button {
  background: #009435;
  border: 1px solid #009435;
}
.container {
  max-width: 100%;
}
    .corner.top {
        top: -2px;
        border-top: 2px solid white;
    }

    .corner.bottom {
        bottom: -2px;
        border-bottom: 2px solid white;
    }

    .corner.left {
        left: -2px;
        border-left: 2px solid white;
    }

    .corner.right {
        right: -2px;
        border-right: 2px solid white;
    }

    .corner {
        height: 25px;
        width: 25px;
        position: absolute;
    }
</style>
