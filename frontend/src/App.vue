<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { RouterView } from 'vue-router'
  import axios from 'axios'

  const collections = ref([])
  onMounted(() => {
    axios.get('collections')
      .then(response => {
        collections.value = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const name = ref()
  function addCollection() {
    axios.post('collection', {
      name: name.value,
    })
      .then(response => {
        name.value = ''
        collections.value.push(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
</script>

<template>
  <nav class="navbar navbar-expand-md bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Task App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto text-center">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li v-for="collection in collections" :key="collection.id" class="nav-item">
            <a :href="`${collection.id}`" class="nav-link active" aria-current="page">{{ collection.name }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark btn btn-outline-primary" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">Add Collection</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="addCollection" class="mt-3">
            <div class="input-group mb-3">
              <input v-model="name" class="form-control" type="text" placeholder="Add Collection">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>
