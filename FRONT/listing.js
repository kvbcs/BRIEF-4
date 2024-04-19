console.log("allo");

async function createListing() {
	let title = document.querySelector("#title").value;
	let image = document.querySelector("#image").value;
	let description = document.querySelector("#description").value;
	let maxParticipants = document.querySelector("#maxParticipants").value;
	let userId = window.localStorage.getItem("id");

	let listing = {
		title: title,
		image: image,
		description: description,
		maxParticipants: maxParticipants,
	};
	let jwt = window.localStorage.getItem("jwt");

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(listing),
	};

	let apiRequest = fetch("http://localhost:5000/createListing", request);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		console.log(response);
		window.location.href = "./index.html";
	}
}
