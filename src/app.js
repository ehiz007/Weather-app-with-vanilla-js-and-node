const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utils/geocode")
const getWeather = require("./utils/weather")

const app = express()
const port = process.env.PORT || 3000

//Paths
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//set express view engines and hbs partials
app.set("view engine", "hbs")
app.set("views", viewsPath)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

/// Routes
app.get("", (req, res) => {
	res.render("index", {
		title: "Home page",
		name: "Ehiz_briel",
	})
})

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About page",
		name: "Ehiz_briel",
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Ehiz_briel",
	})
})

app.get("/help/*", (req, res) => {
	res.render("error", {
		error: "Help article not found",
	})
})

app.get("/weather", (req, res) => {
	if (!req.query.address)
		return res.send({ error: "Please enter a valid address!!" })

	geocode(req.query.address, (error, { long, lat, location } = {}) => {
		if (error) {
			if (error.matchless) {
				return res.send({ error: error.matchless })
			} else {
				return res.send({ error: { ...error } })
			}
		}
		getWeather(long, lat, (error, { temperature, summary, icons } = {}) => {
			if (error) return res.send({ error })
			res.send({ temperature, summary, location, icons })
		})
	})
})

app.get("*", (req, res) => {
	res.render("error", {
		error: "Page not found",
	})
})

app.listen(port, () => console.log(`server is up on port ${port}`))
