<template>
    <div>
        <h1>page H1</h1>

    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

onMounted((e)=>{
  const api = `${import.meta.env.VITE_APIPATH}/api/${import.meta.env.VITE_CUSTOMPATH}/products`
  console.log(api)
//   const api = `https://vue-course-api.hexschool.io/api/ozeu/products`
//   console.log('VITE_APIPATH: ',  import.meta.env.VITE_APIPATH)
//   console.log('CUSTOMPATH: ',  import.meta.env.VITE_CUSTOMPATH)
  axios.get(api).then((response)=>{
      console.log(response.data)
    })
})
    
</script>
