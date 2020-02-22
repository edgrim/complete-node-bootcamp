module.exports = (template, data) => {
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
