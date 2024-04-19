console.log("allo");

async function handleRegister() {
	let firstName = document.querySelector("#firstName").value;
	let lastName = document.querySelector("#lastName").value;
	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;

	let user = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(user),
	};

	let apiRequest = await fetch("http://localhost:5000/register", request);
	let response = await apiRequest;
	console.log(response);
	if (response.status === 200) {
		window.location.href = "./login.html";
	}
}

async function handleLogin() {
	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;

	let user = {
		email: email,
		password: password,
	};

	let request = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(user),
	};

	let apiRequest = fetch("http://localhost:5000/login", request);
	let response = await apiRequest;
	if (response.status === 200) {
		const data = await response.json();
		console.log(data.jwt);

		window.localStorage.setItem("jwt", data.jwt);
				window.localStorage.setItem("id", data._id);


		setTimeout(() => {
			window.location.href = "./index.html";
		}, 1000);
	}
}
