import express from 'express'
import createVectorEmbeddings from './embedding.js'
import vectorSearch from './vectorSearch.js'
import generateResponse from './generation.js'

const router = express.Router()

router.post('/query', async (req, res) => {
        // get question from frontend request
        const query = req.body.chunk
    try {
        // convert question into vector embedding
        const embedding = await createVectorEmbeddings(query)

        // search for 3 documents with closest similarity
        const documents = await vectorSearch(embedding[0])

        // create an array with only the text data of those chunks
        const context = documents.map((doc, id) => doc.chunk)

        // send context and question to Google Gemini AI
        const response = await generateResponse(context, query)

        // return Google Gemini AI response to frontend
        res.status(200).send({
            message: 'Documents retrieved!',
            payload: response,
        })

    } catch(e) {
        res.status(400).send({
            message: `error sending query ${e}`
        })
    }
})

export default router;