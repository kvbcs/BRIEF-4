console.log("allo");

let signup = document.querySelector(".signup");
let main = document.querySelector("main");
let event = document.querySelector(".event");

async function getAllListings() {
	let apiCall = await fetch("http://localhost:5000/getAllListings");
	let response = await apiCall.json();
	console.log(response);

	response.forEach((listing) => {
		main.innerHTML += `<div class="event"> <div class="event_img"><img src="${listing.image}"/> </div> <div class="event-text"><h2>${listing.title}</h2>  <p>${listing.description}</p> <h3>${listing.maxParticipants}</h3> </div> </div>`;
	});
}

getAllListings();

async function test() {
	let request = {
		method: "GET",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	};

	let apiRequest = await fetch("http://localhost:5000/getAllUsers", request);
	let response = await apiRequest.json();
	console.log(response);
}

test();
