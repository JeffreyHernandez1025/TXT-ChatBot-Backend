// import dependencies
import { pipeline } from '@xenova/transformers';

export default async function createVectorEmbeddings(chunkContent) {
    try {
        const extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
        )
        
        const embeddings = await extractor(chunkContent, {
            pooling: 'mean', 
            normalize: 'true'
        })
        return embeddings.tolist()
    } catch(e) {
        throw e
    }
}