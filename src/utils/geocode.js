const request = require("request")

const getLocation = (location, callback) => {
	const apiKey =
		"pk.eyJ1IjoiZWhpejAwNyIsImEiOiJja2l4M283OHcxdjlzMnNuNGRlZmpmZHE0In0.D-SzNRsE8nPbpS7KZwv89Q"
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location,
	)}.json?limit=1&access_token=${apiKey}`

	request({ url, json: true }, (error, response) => {
		if (error) callback(error, undefined)
		else if (response.body.features.length === 0) {
			callback(
				{ matchless: "No location matches the search address" },
				undefined,
			)
		} else {
			const location = response.body.features[0].place_name
			const [lat, long] = response.body.features[0].center
			callback(undefined, { long, lat, location })
		}
	})
}

module.exports = getLocation
