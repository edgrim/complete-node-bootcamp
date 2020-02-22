// SECTION: Files
// NOTE: Syncronous
// const fs = require('fs');
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `
// This is the input:
// ${textIn}

// Created on ${Date.now()
// 	.toLocaleString()
// 	.split(',')
// 	.join('.')} milliseconds
// `;

// fs.writeFileSync('./txt/output.txt', textOut);

// NOTE: Asyncronous
// const fs = require('fs');
// fs.readFile('./txt/start.tt', 'utf-8', (error, data1) => {
// 	if (error) console.error(`ERROR 🐛\n${error}`);

// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
// 		fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
// 			fs.writeFile(
// 				'./txt/final.txt',
// 				`${data2}\n\n${data3}\n\n${Date.now().toTimeString()}`,
// 				'utf-8',
// 				(err) => {
// 					if (err) console.error(err);
// 					console.log('✅');
// 				}
// 			);
// 		});
// 	});
// });

// console.log(12345678900987654321);
// !SECTION: Files

// SECTION: Server
const replaceTemplate = (template, product) => {
	let output = template.replace(/{%ID%}/g, product.id);
	output = output
		.replace(/{%PRODUCT_NAME%}/g, product.productName)
		.replace(/{%IMAGE%}/g, product.image)
		.replace(/{%FROM%}/g, product.from)
		.replace(/{%NUTRIENTS%}/g, product.nutrients)
		.replace(/{%QUANTITY%}/g, product.quantity)
		.replace(/{%PRICE%}/g, product.price)
		.replace(/{%NOT_ORGANIC%}/g, product.organic ? '' : 'not-organic')
		.replace(/{%DESCRIPTION%}/g, product.description);

	return output;
};

const http = require('http');
const fs = require('fs');

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-Product.html`,
	'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	// Overview page
	if (pathName === '/overview') {
		res.writeHead(200, {
			ContentType: 'text/html'
		});

		const cardsHtml = dataObject
			.map((el) => replaceTemplate(tempCard, el))
			.join('');

		console.log(typeof cardsHtml);

		const finalOverviewPage = tempOverview.replace(
			'{%PRODUCT_CARDS%}',
			cardsHtml
		);

		res.end(finalOverviewPage);

		// Product page
	} else if (pathName === '/product') {
		res.end('Product');

		// API
	} else if (pathName === '/api') {
		fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
			if (err) console.error(err);
			res.writeHead(200, {
				'Content-type': 'application/json'
			});
			res.end(data);
		});

		// Not found
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-header': 'hello-world'
		});
		res.end('<h1>Error title</h1>');
	}
});

server.listen(8000, 'localhost', () => {
	console.log('Listening on port 8000…');
});
