console.log("allo");

let main = document.querySelector("main");

async function getMyListings() {
	let jwt = window.localStorage.getItem("jwt");

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: `Bearer ${jwt}`,
		},
	};

	let apiRequest = await fetch(
		"http://localhost:5000/getMyListings",
		request
	);
	let response = await apiRequest.json();
	console.log(response);
	response.forEach((listing) => {
		main.innerHTML += `<div class="event">
		<div class="event_img">
		<img src="${listing.image}"/>
		</div>
		<div class="event-text">
		<h2>${listing.title}</h2>
		<p>${listing.description}</p> 
		<div>
		<h3>Participants : 0/${listing.maxParticipants}</h3> 
		<button class="btn-edit-${listing._id}">Edit</button> 
		<button class="btn-delete-${listing._id}">Delete</button>
		</div>
		</div>
		</div>`;

		let btnDelete = document.querySelector(`.btn-delete-${listing._id}`);
		btnDelete.addEventListener("click", () => {
			deleteListing(listing._id);
		});
		let btnEdit = document.querySelector(`.btn-edit-${listing._id}`);
		btnEdit.addEventListener("click", () => {
			editListing(listing._id, listing);
		});
	});
}

getMyListings();

async function deleteListing(listingId) {
	let request = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(id),
	};

	let apiRequest = await fetch(
		"http://localhost:5000/getMyListings",
		request
	);
	let response = await apiRequest.json();
}
