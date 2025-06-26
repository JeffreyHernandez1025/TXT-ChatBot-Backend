// importing dependencies
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

// function scraps TXT website for html data
const getRetrievalData = async () => {
    try {

        const websites = [""]
        const allContent = []

        // launches puppeteer as a headless broswer search, 
        // and waits until there are no more than 2 network connections
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()

        await page.goto('https://urbantxt.org/home', {waitUntil: 'networkidle2'})
        const content = await page.content()

        // parse HTML with cheerio
        const $ = cheerio.load(content)
        
        // create empty array
        const allReturnData = []

        // iterate through all text tags
        $('h1, h2, h3, h4, h5, h6, p').each((_idx, el) => {

            // get each elements text
            const returnData = $(el).text()
            
            // store text in array
            allReturnData.push(returnData)
        })

        // return array
        return allReturnData
    } catch (e) {
        throw e
    }
}

module.exports = getRetrievalData;