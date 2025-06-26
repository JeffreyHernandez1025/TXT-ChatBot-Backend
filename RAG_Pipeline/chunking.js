// import dependencies
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// initialize splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
})

// retrieve data
export default async function chunker(allData) {
    // combine all the text
    const text = allData.join(" ")
    
    // split the text into chunks
    const documents = await splitter.createDocuments([text])
    console.log(`chunk count: ${documents.length}.`)

    return documents
}