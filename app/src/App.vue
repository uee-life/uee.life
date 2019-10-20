<template>
  <div id="app" class="small-contaienr">
    <img alt="Vue logo" src="@/assets/logo.png">
    <location-data />
  </div>
</template>

<script>
import LocationData from '@/components/LocationData.vue'

export default {
  name: 'app',
  components: {
    LocationData
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  background: #009435;
  border: 1px solid #009435;
}
.small-contaienr {
  max-width: 680px;
}
</style>
