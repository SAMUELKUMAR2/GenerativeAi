import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express()

env.config()
app.use(cors())
app.use(bodyParser.json())


// Configure open api
// const configuration = new Configuration({
//     organization: "org-14xkkSOqlvYyfnf7O7c84Uh9",
//     apiKey: process.env.API_KEY // VISIT .env AND MAKE CHANGES
// })
// const openai = new OpenAIApi(configuration)

 



// listeninng
app.listen("3080", ()=>console.log("listening on port 3080"))


// dummy route to test
app.get("/", (req, res) => {
    res.send("Server is working well?")
})


//post route for making requests
app.post('/', async (req, res)=>{
    const {message} = req.body

    try{
        // const response = await openai.chat.completions.create({
           
        //     model: "gpt-3.5-turbo-instruct",
            
        //     prompt: `${message}`,
        //     max_tokens: 100,
        //     temperature: .5
        // })
        // console.log(response);
        // res.json({message: response.data.choices[0].text})

//Data fetching using google Ai (gimini)


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCyE2mzWT0sCFqL7XqBHtZmxrTZROyX1Us");


  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `${message}`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const ans = response;

  res.json({message:ans.text()})


    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})