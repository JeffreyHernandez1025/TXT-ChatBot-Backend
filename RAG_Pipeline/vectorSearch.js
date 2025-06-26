import { documentModel } from "../models/documentModel.js"

export default async function vectorSearch(embedding) {
    try {
        const pipeline = [
            {
                $vectorSearch: {
                    queryVector: embedding,
                    path: "embedding",
                    numCandidates: 36,
                    limit: 3,
                    index: 'vector_index'
                }
            }
        ];

        const results = await documentModel.aggregate(pipeline)

        return results

    } catch(e) {    
        throw e
    }
}