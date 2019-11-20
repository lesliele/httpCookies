<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="dbClick">点击</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  methods: {
    dbClick() {
      axios.post('http://10.1.1.40:9017/api/user', {
        data: {
          a: 2
        }
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-header-f': '1234'
        },
        withCredentials: true
      }).then(res => {
        console.log(document.cookie)
        console.log(res);
      }) 
    }
  }
}
</script>
