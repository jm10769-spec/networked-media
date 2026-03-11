const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();


const upload = multer({ dest: 'public/uploads' });

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs'); 

let serverStoredPosts = [];
const submissionsFile = path.join(__dirname, 'submissions.json');
const creatureCatalog = [
	{
		name: 'Yinglong',
		href: '/creature/yinglong',
		image: '/creature%20pictures/YingLong.jpg',
	},
	{
		name: 'Nine-Tailed Fox',
		href: '/creature/nine-tailed-fox',
		image: '/creature%20pictures/NineTailsFox.jpg',
	},
	{
		name: 'BaShe',
		href: '/creature/ba-she',
		image: '/creature%20pictures/BaShe.jpg',
	},
	{
		name: 'TaoTie',
		href: '/creature/tao-tie',
		image: '/creature%20pictures/TaoTie.jpg',
	},
	{
		name: 'BiFang',
		href: '/creature/bifang',
		image: '/creature%20pictures/BiFang.jpg',
	},
	{
		name: 'Cerberus',
		href: '/creature/cerberus',
		image: '/creature%20pictures/Cerberus.jpg',
	},
	{
		name: 'Kraken',
		href: '/creature/kraken',
		image: '/creature%20pictures/Kraken.jpg',
	},
	{
		name: 'Medusa',
		href: '/creature/medusa',
		image: '/creature%20pictures/Medusa.png',
	},
	{
		name: 'Mothman',
		href: '/creature/mothman',
		image: '/creature%20pictures/Mothman.jpg',
	},
	{
		name: 'Aura',
		href: '/creature/aura',
		image: '/logo.png',
	},
];

const getRandomCreatures = (count = 4) => {
	const shuffled = [...creatureCatalog];
	for (let i = shuffled.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, Math.min(count, shuffled.length));
};

const loadSubmissions = () => {
	if (!fs.existsSync(submissionsFile)) {
		return;
	}

	try {
		const raw = fs.readFileSync(submissionsFile, 'utf8').trim();
		if (!raw) {
			return;
		}

		try {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) {
				serverStoredPosts = parsed;
				return;
			}
		} catch (parseError) {
			const lines = raw.split('\n').filter((line) => line.trim());
			const parsedLines = lines.map((line) => JSON.parse(line));
			serverStoredPosts = parsedLines;
			fs.writeFileSync(submissionsFile, JSON.stringify(serverStoredPosts, null, 2));
			return;
		}
	} catch (error) {
		console.error('Failed to load submissions:', error);
	}
};

loadSubmissions();

app.get('/', (request, response) => {
	const submitted = request.query.submitted === '1';
	response.render('index.ejs', {
		clientPosts: serverStoredPosts,
		submitted,
		exploreCreatures: getRandomCreatures(4),
	});
});
app.get('/creature/yinglong', (request, response) => {
	response.render('creature-YingLong.ejs');
});
app.get('/creature/nine-tailed-fox', (request, response) => {
	response.render('creature-NinetailsFox.ejs');
});
app.get('/creature/ba-she', (request, response) => {
	response.render('creature-BaShe.ejs');
});
app.get('/creature/tao-tie', (request, response) => {
	response.render('creature-TaoTie.ejs');
});
app.get('/creature/bifang', (request, response) => {
	response.render('creature-BiFang.ejs');
});
app.get('/creature/cerberus', (request, response) => {
	response.render('creature-Cerberus.ejs');
});
app.get('/creature/kraken', (request, response) => {
	response.render('creature-Kraken.ejs');
});
app.get('/creature/medusa', (request, response) => {
	response.render('creature-Medusa.ejs');
});
app.get('/creature/mothman', (request, response) => {
	response.render('creature-Mothman.ejs');
});
app.get('/creature/aura', (request, response) => {
	response.render('creature-Aura.ejs');
});
app.get('/api/explore', (request, response) => {
	response.json(getRandomCreatures(4));
});
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	let data = {
		text: req.body.text,
		name: req.body.name,
		pronoun: req.body.pronoun,
		creatureName: req.body.creatureName,
		formation: req.body.formation,
		world: req.body.world,
		origin: req.body.origin,
		description: req.body.description,
		date: currentDate.toLocaleString(),
	};
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}
	serverStoredPosts.push(data);

	fs.writeFile(submissionsFile, JSON.stringify(serverStoredPosts, null, 2), (err) => {
		if (err) {
			console.error('Failed to write submission:', err);
		}
	});
	res.redirect('/?submitted=1');
});

app.listen(6001, () => {
	console.log('server started on port 6001');
});
