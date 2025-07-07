import { documentModel } from "../models/documentModel.js"

export default async function vectorSearch(embedding) {
    try {
        const pipeline = [
            {
                $vectorSearch: {
                    queryVector: embedding, // pass the question vector embedding
                    path: "embedding", // the name of the field in which the embeddings are stored in mongoDB
                    numCandidates: 35, // how many documents should be compared
                    limit: 3, // how many documents should be returned
                    index: 'vector_index' // name of the search index created in mongoDB
                }
            }
        ];

        const results = await documentModel.aggregate(pipeline)
        return results

    } catch(e) {    
        throw e
    }
}