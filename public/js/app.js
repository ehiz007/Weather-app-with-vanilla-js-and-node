const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.getElementById("message1")
const weather = document.getElementById("weather")
const message2 = document.getElementById("message2")
if (location.pathname === "/")
	document.getElementById("1").classList.add("active")
else if (location.pathname === "/help")
	document.getElementById("3").classList.add("active")

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const location = search.value
	message1.textContent = "Loading...."
	weather.innerHTML = ""
	fetch(`/weather?address=${location}`)
		.then((response) => {
			response.json().then((data) => {
				message1.textContent = ""
				if (data.error) {
					if (data.error.code)
						message2.textContent =
							"Weather forecast for address is currently unavailable. Check your internet connection!"
					else message2.textContent = data.error
				} else {
					const temperature = document.createElement("h3")
					const loc = document.createElement("p")
					const summary = document.createElement("p")

					temperature.textContent = data.temperature + " " + "℃"
					loc.textContent = data.location
					summary.textContent = data.summary

					weather.appendChild(temperature)
					weather.appendChild(loc)
					weather.appendChild(summary)
				}
			})
		})
		.catch((err) => console.log(err))
})
