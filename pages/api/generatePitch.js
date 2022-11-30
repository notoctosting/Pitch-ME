import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `write me a professional startup business pitch to investors about the title below.Go deep into why they should invest. Explain how this relates to the title:`;

const generateAction = async (req, res) => {
  // Run first prompt
  // console.log(`API: ${basePromptPrefix}${req.body.selected}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.selected}`,
    temperature: 0.84,
    max_tokens: 1000,
    frequency_penalty: 1.5,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
