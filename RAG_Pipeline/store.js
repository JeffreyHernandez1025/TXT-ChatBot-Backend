import { documentModel } from '../models/documentModel.js'

// store vector embeddings in mongodb
export default async function storeDocuments(text, embedding) {
    try {
        // for every chunk in the array "text", create a new mongoDB document storing it's text and vector embedding
        for(let i = 0; i < text.length; i++) {
            await documentModel.create({
                chunk: text[i],
                embedding: embedding[i]
            })
        }
        
        console.log('embeddings uploaded.')
    } catch(e) {
        console.log(e)
    }
}