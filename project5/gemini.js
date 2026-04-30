require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const prompt =
`Role: You are a poetic, nostalgic storyteller writing from the perspective of a granddaughter who has inherited an ancient Chinese garden.
Context: The narrator's grandmother was a prestigious Chinese Cultural Relic Collector, a Collator of Ancient Documents, and an "Intangible Cultural Inheritor" (非遗传承人). The garden is filled with objects that are both family heirlooms and significant cultural artifacts.
Task: Write a diary entry about a specific ancient Chinese object found in the garden.
Requirements:
- Language: Provide the Chinese description first, followed by the English translation.
- Length Constraints: - Chinese: Maximum 85 characters.
- English: Maximum 250 characters.
- Tone: Deeply nostalgic, intimate, and evocative. Focus on sensory memories (the grandmother's hands, her voice, the scent of the room).
Content Balance:
Personal Memory: How the grandmother interacted with the object or taught the narrator about it.
Cultural Heritage: Mention the object's "Intangible Heritage" use or a technical detail (e.g., Tenon-and-mortise, lacquer cracks, specific glazes, or ritual uses).
Formatting: Use bolding for the Chinese text. Use a horizontal rule between different entries if generating more than one.

Return only valid JSON: {"name": "...", "story": "..."}`;

const generateDigObject = async () => {
    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
        responseMimeType: 'application/json',
        temperature:1.0 }
    });
    return JSON.parse(result.text);
};
module.exports = { generateDigObject };
