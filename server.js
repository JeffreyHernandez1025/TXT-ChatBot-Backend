// import dependencies
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

// import routes
import answerQuery from './RAG_Pipeline/answerQuery.js'

// scrape and save retreival data
import getRetrievalData from './RAG_Pipeline/crawling.js'
import chunker from './RAG_Pipeline/chunking.js'
import createVectorEmbeddings from './RAG_Pipeline/embedding.js'
import storeDocuments from './RAG_Pipeline/store.js'

async function createRetrievalDocuments() {
    const allData = await getRetrievalData()
    console.log("pages scraped, now chunking...")
    const chunks = await chunker(allData)
    const chunkContent = ["We serve young men of color between the 7th and 11th grade who are from low income communities. Since 2009, we’ve used the concept of developing strong teams as a way for our young men to learn about collaboration, ideation, and long-lasting life skills. In small teams, our youths learn the process of taking an idea from concept to market."]// chunks.map((chunk, id) => chunk.pageContent.toString())
    console.log("converting to vector embeddings...")
    const embeddings = await createVectorEmbeddings(chunkContent)
    console.log("storing embeddings on mongodb...")
    console.log(embeddings)
    storeDocuments(chunkContent, embeddings)
}

// set up dotenv and PORT
dotenv.config()
const PORT = process.env.PORT

// initialize server
const server = express()

// middleware
server.use(express.json())
server.use(cors())

// connect to DB
async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected to DB')
    } catch(e) {
        console.log(e)
    }
}
connectToDB()

// createRetrievalDocuments()

// run routes
server.use(answerQuery)

// run server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})