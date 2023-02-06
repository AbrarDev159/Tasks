<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  const tasks = ref([])
  const collections = ref([])
  onMounted(() => {
    axios.get('tasks')
      .then(response => {
        tasks.value = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('collections')
      .then(response => {
        collections.value = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const content = ref()
  function addTask() {
    axios.post('task', {
      content: content.value,
    })
      .then(response => {
        content.value = ''
        tasks.value.push(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const content2 = ref()
  const status = ref()
  function updateTask(task_id) {
    axios.put(`task/${task_id}`, {
      content: content2.value,
      status: status.value
    })
      .then(response => {
        location.reload();
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteTask(task_id, task_name) {
    if (confirm(`Do you really want to delete ${task_name}? `)) {
      axios.delete(`task/${task_id}`)
        .then(response => {
          location.reload();
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

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

  const name2 = ref()
  function updateCollection(collection_id) {
    axios.put(`collection/${collection_id}`, {
      name: name2.value,
    })
      .then(response => {
        location.reload();
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteCollection(collection_id, collection_name) {
    if (confirm(`Do you really want to delete ${collection_name}? `)) {
      axios.delete(`collection/${collection_id}`)
        .then(response => {
          location.reload();
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<template>
  <div class="container">
    <form v-on:submit.prevent="addTask" class="mt-3">
      <div class="input-group mb-3">
        <input v-model="content" class="form-control" type="text" placeholder="Add task">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>

    <form v-on:submit.prevent="addCollection" class="mt-3">
      <div class="input-group mb-3">
        <input v-model="name" class="form-control" type="text" placeholder="Add Collection">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>

    <div v-for="collection in collections" :key="collection.id" class="mb-2">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-3">
            <div class="dropdown float-end">
              <a class="text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical float-end" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="updateCollection(collection.id)" type="button">Update Collection</a></li>
                <li><a class="dropdown-item" @click="deleteCollection(collection.id, collection.name)" type="button">Delete Collection</a></li>
              </ul>
            </div>
            <span>collection: {{ collection.name }}</span>
            <input v-model.lazy="name2" type="text" class="form-control">
          </div>
        </div>
      </div>
    </div>


    <div v-for="task in tasks" :key="task.id" class="mb-2">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-3">
            <div class="dropdown float-end">
              <a class="text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical float-end" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="updateTask(task.id)" type="button">Update Task</a></li>
                <li><a class="dropdown-item" @click="deleteTask(task.id, task.content)" type="button">Delete Task</a></li>
              </ul>
            </div>
            <input @change="updateTask(task.id)" v-model.lazy="status" :checked="task.status" class="form-check-input float-start" type="checkbox" id="status" />
            <span v-if="task.status" class="text-decoration-line-through">task: {{ task.content }}</span>
            <span v-else>task: {{ task.content }}</span>
            <input v-model.lazy="content2" type="text" class="form-control">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>