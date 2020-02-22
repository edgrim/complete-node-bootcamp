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
const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = (template, data) => {
	let output = template.replace(/{%ID%}/g, data.id);
	output = output
		.replace(/{%PRODUCT_NAME%}/g, data.productName)
		.replace(/{%IMAGE%}/g, data.image)
		.replace(/{%FROM%}/g, data.from)
		.replace(/{%NUTRIENTS%}/g, data.nutrients)
		.replace(/{%QUANTITY%}/g, data.quantity)
		.replace(/{%PRICE%}/g, data.price)
		.replace(/{%NOT_ORGANIC%}/g, data.organic ? '' : 'not-organic')
		.replace(/{%DESCRIPTION%}/g, data.description);

	return output;
};

//  TODO: Convert to object and add replaceTemplate() as method
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
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// Overview page
	if (pathname === '/overview') {
		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join('');

		const finalOverviewPage = tempOverview.replace(
			'{%PRODUCT_CARDS%}',
			cardsHtml
		);

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(finalOverviewPage);

		// Product page
	} else if (pathname === '/product') {
		const productData = dataObj[query.id];
		const productPage = replaceTemplate(tempProduct, productData);

		res.writeHead(200, { 'Content-type': 'text-html' });
		res.end(productPage);

		// API
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);

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
