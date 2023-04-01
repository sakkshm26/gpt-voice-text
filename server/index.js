import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { auth } from "./middlewares/index.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
    organization: process.env.ORG_ID,
  })
);

const port = process.env.PORT || 4000;

app.post("/getreply", auth, async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${req.body.message}. Reply in less than 20 words.` }],
    });
    res.send({message: response.data.choices[0].message?.content});
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + 4000);
});
