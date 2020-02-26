const fs = require('fs');
const crypto = require('crypto');

const consoleLog = (item) => {
	console.log(item);
};

process.env.UV_THREADPOOL_SIZE = 2;

const start = Date.now();

setTimeout(() => {
	consoleLog('Timer 1 finished');
}, 0);

setImmediate(() => {
	consoleLog('Immediate 1 finished');
});

fs.readFile('./test-file.txt', () => {
	consoleLog('I/O finished');
	consoleLog('---');

	setTimeout(() => {
		consoleLog('Timer 2 finished');
	}, 0);

	setTimeout(() => {
		consoleLog('Timer 3 finished');
	}, 3000);

	setImmediate(() => {
		consoleLog('Immediate 2 finished');
	});

	process.nextTick(() => {
		consoleLog('process.nextTick');
	});

	crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
		console.log(`\n\n\n`);
		consoleLog(Date.now() - start, 'Password encripted');
	});

	crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
		consoleLog(Date.now() - start, 'Password encripted');
	});
	crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
		consoleLog(Date.now() - start, 'Password encripted');
	});
	crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
		consoleLog(Date.now() - start, 'Password encripted');
	});
	crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
		consoleLog(Date.now() - start, 'Password encripted');
		console.log(`\n\n\n`);
	});
});

consoleLog('Top level code');
