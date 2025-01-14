import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Generate a detailed & concise business strategy about the business idea below; include a value propisition, Timeline, and monitization strategy about: 

`;

const generateAction = async (req, res) => {
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${basePromptPrefix}${req.body.selected}

    Business Strategy:`,
    temperature: 0.84,
    max_tokens: 400,
    frequency_penalty: 1.5,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
