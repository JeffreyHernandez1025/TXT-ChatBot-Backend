// import dependencies
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

// scrape and save return data
const retrievalData = require('./RAG_Pipeline/crawling.js')
const chunker = require('./RAG_Pipeline/chunking.js')

async function main() {
    const allData = await retrievalData()
    const chunks = await chunker(allData)
    
}

main()

// set up dotenv and PORT
dotenv.config()
const PORT = process.env.PORT

// initialize server
const server = express()

// middleware

// connect to DB

// run server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})