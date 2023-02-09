<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  const route = useRoute();

  const id = ref()
  const name = ref()
  const tasks = ref([])
  onMounted(() => {
    const collection_detail = route.params.collection_detail
    axios.get(`collection/${collection_detail}`)
      .then(response => {
        id.value = response.data.id
        name.value = response.data.name
        tasks.value = response.data.tasks
        console.log('data', response.data)
        console.log('tasks ', response.data.tasks)
      })
      .catch(error => {
        console.log(error)
      })
  })

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
          location.replace('/')
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const content = ref()
  function addTask(ct_id) {
    axios.put(`collection/${ct_id}/task`, {
      content: content.value,
    })
      .then(response => {
        content.value = ''
        location.reload();
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
          let i = tasks.value.map(data => data.id).indexOf(task_id);
          tasks.value.splice(i, 1);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

</script>

<template>
  <div class="container mt-3">

    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel2">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateCollection(id)" class="mt-3">
              <div class="input-group mb-3">
                <input v-model="name2" class="form-control" type="text" placeholder="Update Collection Name">
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

    <div class="dropdown float-end">
      <a class="text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal2" href="#">Update Collection</a></li>
        <li><a @click="deleteCollection(id, name)" class="dropdown-item" type="button">Delete Collection</a></li>
      </ul>
    </div>
    <h1 class="text-center text-capitalize">{{ name }}</h1>

    <form v-on:submit.prevent="addTask(id)">
      <div class="input-group mb-3">
        <input v-model="content" class="form-control" type="text" placeholder="Add task">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>

    <div v-for="task in tasks" :key="task.id" class="mb-2">
      <div class="card">
        <div class="card-body text-center">
          <div class="dropdown float-end">
            <a class="text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical float-end" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" data-bs-toggle="modal" :data-bs-target="`#updateModal${task.id}`" type="button">Update Task</a></li>
              <li><a class="dropdown-item" @click="deleteTask(task.id, task.content)" type="button">Delete Task</a></li>
            </ul>
          </div>
          <input @change="updateTask(task.id)" v-model.lazy="status" :checked="task.status" class="form-check-input float-start" type="checkbox" id="status" />
          <span v-if="task.status" class="text-decoration-line-through">task: {{ task.content }}</span>
          <span v-else>task: {{ task.content }}</span>

          <div class="modal fade" :id="`updateModal${task.id}`" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel2">Edit {{ task.content }}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form v-on:submit.prevent="updateTask(task.id)" class="mt-3">
                    <div class="input-group mb-3">
                      <input v-model="content2" class="form-control" type="text" placeholder="Update Task">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button @click="updateTask(task.id)" type="button" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>