// import dependencies
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')

// initialize splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
})

// retrieve data
async function chunker(allData) {
    // combine all the text
    const text = allData.join(" ")
    
    // split the text into chunks
    const documents = await splitter.createDocuments([text])
    console.log(`This is the chunk count: ${documents.length}.`)

    return documents
}

module.exports = chunker;