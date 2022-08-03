import originalFetch from "isomorphic-unfetch";
import fetchBuilder from "fetch-retry-ts";

const baseURL = "https://hmis-dev.health.go.ug/db-api/api/v2";
const defaultToken =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoiJDJiJDEyJGMuMFFCZ1RRbVI5ZE1GcFcyWXhiZS5NVG5JdmZ4M2s0Qi40bjJiYzdaY2hpWFcxY1BuQk8yIiwidXNlciI6ImFkbWluMiJ9.nRYsIQpcXK4yQlvKlpZkvW1XnNr21MXf9puzgCtpmfA";

let token;

const options = {
	retries: 3,
	retryDelay: 1000,
	retryOn: [419, 503, 504],
};

const fetch = fetchBuilder(originalFetch);

export const fetchNINToken = async (engine) => {
	// check exists
	const res = await engine.link.fetch("/api/dataStore");
	console.log(res);
	if (!res.includes("NINtoken")) {
		// Create the name space
		engine.link.fetch(`/api/dataStore/NINtoken/NINtoken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token: defaultToken }),
		});
		token = defaultToken;
	} else {
		const res = await engine.link.fetch(`/api/dataStore/NINtoken/NINtoken`);
		token = res.token;
	}
};

export const getNINPerson = (nin) => {
	return fetch(`${baseURL}/getPerson`, {
		method: "POST",
		retries: 3,
		retryDelay: 3000,
		retryOn: [419, 503, 504],
		body: JSON.stringify({
			nationalId: nin,
			token: token,
		}),
	}).then((response) => response.json());
};

export const getNINPlaceOfBirth = (nin) => {
	return fetch(`${baseURL}/getPlaceOfResidence`, {
		method: "POST",
		retries: 3,
		retryDelay: 3000,
		retryOn: [419, 503, 504],
		body: JSON.stringify({
			nationalId: nin,
			token: token,
		}),
	}).then((response) => response.json());
};
