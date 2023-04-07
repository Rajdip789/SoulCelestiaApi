const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const openai = require('./config/apiConfig');
const calculateCarbon = require('./utils/calculateCarbon');

const port = process.env.PORT || 5000

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// const corsOption = {
//     origin: ['http://localhost:3000'],
// 	methods: ['GET', 'POST'], 
// 	credentials: true,
// };
// app.use(cors(corsOption));

app.post('/get-answer', async (req, res) => {
	const {totalEmissions, perCapitaEmissions} = calculateCarbon(50000, 3000, 10000, 1600);

	const prompt = `Total Carbon Footprint: ${totalEmissions} metric tons CO2e per year, per Capita Carbon Footprint: ${perCapitaEmissions} metric tons CO2e per year. Give me suggestions to reduce this footprints.`;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature:0.2,
	});
	
	console.log(response.data.choices[0].text);

	res.send({ body : response.data.choices[0].text})
})

app.listen(port, () => {
	console.log(`App listening on port ${port}!`)
})