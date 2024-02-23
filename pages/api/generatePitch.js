import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `write me a professional, concise, startup business pitch to investors about the business idea below. Be convincing and concise. 
Business idea:`;

const generateAction = async (req, res) => {
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${basePromptPrefix}${req.body.selected}`,
    temperature: 0.84,
    max_tokens: 400,
    frequency_penalty: 1.5,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
