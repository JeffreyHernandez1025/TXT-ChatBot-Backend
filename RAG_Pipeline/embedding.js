// import dependencies
import { pipeline } from "@xenova/transformers";

export default async function createVectorEmbeddings(chunkContent) {
  try {
    // feature-extraction is why the model generates embeddings and not text
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    // pass the text, define the pooling aka the combination of the embeddings to be the average of the whole text, 
    // and set normalize to true making the magnitude of the vector to 1, enhancing cosine similarity.
    const embeddings = await extractor(chunkContent, {
      pooling: "mean",
      normalize: "true",
    });
    return embeddings.tolist();
  } catch (e) {
    throw e;
  }
}
