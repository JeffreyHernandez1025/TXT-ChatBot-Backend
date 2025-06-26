import express from 'express'
import createVectorEmbeddings from './embedding.js'
import vectorSearch from './vectorSearch.js'
import generateResponse from './generation.js'

const router = express.Router()

router.post('/query', async (req, res) => {
        const query = req.body.chunk
    try {
        const embedding = await createVectorEmbeddings(query)
        const documents = await vectorSearch(embedding[0])
        const context = documents.map((doc, id) => doc.chunk)
        const response = await generateResponse(context, query)

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