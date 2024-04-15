console.log("allo");

let signup = document.querySelector(".signup");

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
