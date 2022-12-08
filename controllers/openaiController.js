const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage = async (req,res) => {
    let imageUrl = [];
    let { prompt, size, numberOfImages } = req.body;
    numberOfImages = Number(numberOfImages);

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            n: numberOfImages,
            size: imageSize,
        });

        response.data.data.map(image => imageUrl.push(image.url));
        res.status(200).json({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
        console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

module.exports = { generateImage }