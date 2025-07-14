const { pipeline } = require('@xenova/transformers');

// Load the pipeline once at startup
let generator;
(async () => {
  generator = await pipeline('text-generation', 'Xenova/distilgpt2');
})();

exports.generateText = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    // Wait until the model is loaded
    while (!generator) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    const output = await generator(prompt, { max_new_tokens: 50 });
    res.json({ generated_text: output[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text', details: error.message });
  }
}; 