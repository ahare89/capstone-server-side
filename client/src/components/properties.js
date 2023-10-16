const url = 'https://airbnb-listings.p.rapidapi.com/v2/listing?id=619966061834034729';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e37e099ca6mshb2514c79dfdf6d2p149d43jsnb43d8d8e787e',
		'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}