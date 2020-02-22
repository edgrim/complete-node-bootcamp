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

const server = http.createServer((req, res) => {
	const pathName = req.url;
	let response;

	if (pathName === '/overview') {
		res.end('Overview');
	} else if (pathName === '/product') {
		res.end('Product');
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
