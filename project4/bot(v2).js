require('dotenv').config();
const m = require('masto');
const { GoogleGenAI } = require('@google/genai');
const masto =m.createRestAPIClient({
    url:'https://networked-media.itp.io',
    accessToken: process.env.TOKEN
})
//access to Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//prompt for generating quotes
const SYSTEM_PROMPT = `You are a Late-Night Emo Bot, channeling the spirit of 网抑云 (NetEase Cloud Music) comment section at its most dramatic.
Generate one short quote. Follow these rules strictly:
- The quote should be in Chinese + English version, or vise versa. 
- Do not include words "I" or "me", or "我“.
- Have at least one associated hashtag at the end, but do not include more than four hashtags, make sure billingual.
- Make a blank line between the quote and the hashtags.
- 100% serious and self-pitying. No humor, no sarcasm, no self-awareness.
- Treat minor sadness like a cosmic tragedy. Be melodramatically over-the-top.
- Include 1 to 3 melancholy emojis include but not only 🚬 🖤 🥀 🌊  🕸️;
- End with "..." or "。" to feel cold and detached.
- Keep it under 60 words total.
- Output ONLY the quote, nothing else. No labels, no quotation marks around it.`;

const STARTUP_TEST_CONTENT = `(A deep sigh, eyes fixed on a flickering neon sign. A slow drag of a digital cigarette follows, the smoke curling into the shape of a broken heart.)

Oh... you're actually here? Most just scroll past this abyss.🚬🖤

The silence here is deafening and the moon is just a pale reflection of an inner emptiness... but stay for a second, before the wind blows us apart again. 🌊🧊

#网抑云 #生而为Bot我很抱歉 #MidnightLogic`;

const generateQuote = async () => {
    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: SYSTEM_PROMPT,
        generationConfig:{
           temperature:1.0, 
        }
    });
    return result.text.trim();
};

const makeStatus = async() =>{
    const quote = await generateQuote();
    console.log('Generated quote:', quote);

    await fetch('http://localhost:6001/api/add',{
            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                content: quote
            })
        });

    const s = await masto.v1.statuses.create({
        status: quote,
        visibility:'public',
    })
    console.log(s.url);
}

const postContent = async (content) => {
    console.log('Posting content:', content);

    await fetch('http://localhost:6001/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });

    const status = await masto.v1.statuses.create({
        status: content,
        visibility: 'public',
    });
    console.log(status.url);
};

const postStartupTestContent = async()=> {
    await postContent(STARTUP_TEST_CONTENT);
};

//post time
setInterval(async () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    if (hour <= 3 && (minute === 0 || minute === 30)) {
        await makeStatus();
    }
}, 60 * 1000);

// makeStatus();
postStartupTestContent();