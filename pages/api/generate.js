import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "List 3 evenly worded, creative, forward-thinking business startup ideas relating to ";

const generateAction = async (req, res) => {
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.9,
    max_tokens: 150,
    frequency_penalty: 1.3,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
