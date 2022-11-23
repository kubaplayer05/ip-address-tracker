export { getLocation, uptadeText, renderMap, initial };

const input = document.querySelector("#search");
const ipText = document.querySelector("#ip");
const location = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

const API_KEY = "at_35Ivh7NJP9FC5vPV8i5RIv6vKv1dH&";

const initial = () => {
	const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const info = createInfo(data);
			uptadeText(info);
			renderMap(info);
		})
		.catch((err) => {
      errorText()
    });
};

const getLocation = () => {
	const ip = input.value;
	const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}ipAddress=${ip}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const info = createInfo(data);
			uptadeText(info);
			refreshMap();
			renderMap(info);
		})
		.catch((err) => {
			errorText();
		});
};

const uptadeText = (info) => {
	ipText.textContent = info.ip;
	location.textContent = info.city;
	timezone.textContent = info.timezone;
	isp.textContent = info.isp;
};

const errorText = () => {
	ipText.textContent = "UKNOW";
	location.textContent = "UKNOW";
	timezone.textContent = "UKNOW";
	isp.textContent = "UKNOW";
};

const createInfo = (data) => {
	const info = {
		ip: data.ip,
		location: {
			lat: data.location.lat,
			lng: data.location.lng,
		},
		city: data.location.city,
		country: data.location.country,
		timezone: data.location.timezone,
		isp: data.isp,
	};

	return info;
};

const refreshMap = () => {
	const mapDiv = document.querySelector(".map");
	const main = document.querySelector(".main");
	mapDiv.remove();

	const newMap = document.createElement("div");
	newMap.classList.add("map");
	newMap.id = "map";

	main.appendChild(newMap);
};

const renderMap = (info) => {
	let map = L.map("map").setView([info.location.lat, info.location.lng], 13);

	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

  let marker = L.marker([info.location.lat, info.location.lng]).addTo(map);
};
