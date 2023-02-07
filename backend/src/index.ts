import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json())

// Tasks API
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany()
    res.json(tasks)
})

app.get(`/task/:id`, async (req, res) => {
    const { id } = req.params
    const task = await prisma.task.findUnique({
        where: { id: String(id) },
    })
    res.json(task)
})

app.post(`/task`, async (req, res) => {
    const { content } = req.body
    const result = await prisma.task.create({
        data: {
            content,
        },
    })
    res.json(result)
})

app.put('/task/:id', async (req, res) => {
    const { id } = req.params
    const task = await prisma.task.update({
        where: { id: String(id) },
        data: {
            content: req.body.content,
            status: req.body.status
        },
    })
    res.json(task)
})

app.delete(`/task/:id`, async (req, res) => {
    const { id } = req.params
    const task = await prisma.task.delete({
        where: { id: String(id) },
    })
    res.json(task)
})

//Collections API
app.get('/collections', async (req, res) => {
    const collections = await prisma.collection.findMany()
    res.json(collections)
})

app.get(`/collection/:id`, async (req, res) => {
    const { id } = req.params
    const collection = await prisma.collection.findUnique({
        where: { id: String(id) },
        include: { tasks: true },
    })
    res.json(collection)
})

app.post(`/collection`, async (req, res) => {
    const { name } = req.body
    const result = await prisma.collection.create({
        data: {
            name,
        },
    })
    res.json(result)
})

app.put('/collection/:id', async (req, res) => {
    const { id } = req.params
    const collection = await prisma.collection.update({
        where: { id: String(id) },
        data: {
            name: req.body.name,
        },
    })
    res.json(collection)
})

app.put(`/collection/:id/task`, async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const result = await prisma.collection.update({
        where: { id: String(id) },
        data: {
            tasks: {
                create: [
                    { content: content }
                ]
            },
        },
    })
    res.json(result)
})

app.delete(`/collection/:id`, async (req, res) => {
    const { id } = req.params
    const collection = await prisma.collection.delete({
        where: { id: String(id) },
    })
    res.json(collection)
})

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)