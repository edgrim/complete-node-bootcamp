// SECTION:
// const EventEmitter = require('events');

// class Sales extends EventEmitter {
// 	constructor() {
// 		super();
// 	}
// }

// const myEmitter = new Sales();

// consoleLog('Listening…\n');

// myEmitter.on('new_sale', () => {
// 	consoleLog('A new sale has happened on', Date(Date.now()));
// });

// myEmitter.on('new_sale', (name) => {
// 	consoleLog(`Cusomer name: ${name}`);
// });

// setTimeout(() => {
// 	myEmitter.emit('new_sale', 'Daniel');
// }, 1000);

// const EventEmitter = require('events');

// class Sales extends EventEmitter {
// 	constructor() {
// 		super();
// 	}
// }

// !SECTION:

// SECTION: Server
const http = require('http');

const consoleLog = (item) => {
	return console.log(item);
};

const server = http.createServer();

server.on('request', (req, res) => {
	consoleLog('Request received');
	console.log(req.url);

	res.end('Request received');
});

server.on('request', (req, res) => {
	consoleLog('Another request received');
});

server.on('close', () => {
	consoleLog('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
	consoleLog('Listening…');
});
// !SECTION: Server
