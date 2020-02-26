const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
	// NOTE: Basic
	// fs.readFile('./test-file.txt', (err, data) => {
	// 	if (err) console.log(err);
	// 	res.end(data);
	// });

	// NOTE: Streams
	// const fileRequested = req.url.replace('/', '');
	// const readable = fs.createReadStream(`./${fileRequested}.txt`);

	// readable.on('data', (chunk) => {
	// 	res.write(chunk);
	// });

	// readable.on('end', () => {
	// 	res.end();
	// });

	// readable.on('error', (error) => {
	// 	console.log(error);
	// 	res.statusCode = 404;
	// 	res.end('File name not valid');
	// });

	// NOTE: Use "pipe" to avoid backpressure
	const fileName = req.url;
	const readable = fs.createReadStream(`./${fileName}.txt`);

	readable.pipe(res);

	readable.on('error', () => {
		console.log('Wrong file name');
		res.statusCode = 404;
		res.end('Wrong file name');
	});
});

server.listen(8000, 'localhost', () => {
	console.log('Listening… ');
});
