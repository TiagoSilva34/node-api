// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Server is running')

//     return response.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()
const database = new DatabasePostgres()

server.post("/videos", async (request, replay) => {
    const body = request.body 

    await database.create({
        title: body.title,
        description: body.description,
        duration: body.duration
    })

    return replay.status(201).send()
})

server.get("/videos", async (request, replay) => {
    const search = request.query.search 

    const videos = await database.list(search)

    return videos
})

server.put("/videos/:id", async (request, replay) => {
    const videoId = request.params.id 
    const body = request.body 

    await database.update(videoId, {
        title: body.title,
        description: body.description,
        duration: body.duration
    })

    return replay.status(204).send()
})

server.delete("/videos/:id", (request, replay) => {
    const videoId = request.params.id 

    database.delete(videoId)

    return replay.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})