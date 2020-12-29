const request = require("request")

const getWeather = (long, lat, callback) => {
	const apiKey = "0497d21c900028eba0e88a56ba222108"
	const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${`${long},${lat}`}`
	request({ url, json: true }, (error, response) => {
		if (response) {
			const res = response.body.current
			callback(undefined, {
				temperature: res.temperature,
				summary: `The weather is ${res.weather_descriptions}. There is ${res.precip}% chance of precipitation`,
				icons: res.weather_icons,
			})
		} else {
			callback(error, undefined)
		}
	})
}

module.exports = getWeather

// let entries = Object.entries(res)
// for (const [key, value] of entries) {
// 	console.log(chalk.inverse(`${key} : ${value}`))
// }
