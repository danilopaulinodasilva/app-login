console.log('Carreguei o Main');

const loginForm = $('#loginForm');
const username = $("#email");
const password = $("#password");
const error = $(".alert-error");
const ok = $(".alert-ok");
const logoutBtn = $("#logout");

username.blur(function() {
	validateUsername(username);
});

password.blur(function() {
	validatePassword(password)
});

logoutBtn.click(function() {
	logout(localStorage.getItem("refreshToken"))

	.then((response) => {
		console.log("vc ", response);
		window.location.pathname = "login.html"
		localStorage.clear();
	})

	.catch((err) => {
		console.log("fudeu aqui", err);
	})
});

loginForm.submit(function() {
	var form = $(this);
	
    if (form[0].checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();

		form.removeClass('was-validated');
		form.addClass('needs-validation');
		
		validateUsername(username);
		validatePassword(password);

	  
    } else {
		event.preventDefault();
		event.stopPropagation();
		
		getToken(username.val(),password.val())

		.then((data) => {

			form.addClass('was-validated');

			error.html("");
			error.addClass("d-none");
			
			ok.html("Sucesso! Você será redirecionado, aguarde...");
			ok.removeClass("d-none");
		
			username.removeClass('is-invalid');
			password.removeClass('is-invalid');

			localStorage.setItem("accessToken",data.accessToken);
			localStorage.setItem("refreshToken",data.refreshToken);

			window.location.pathname = localStorage.getItem("whereTo") || "/index.html";

		})

		.catch((err) => {
			error.html(err.message);
			error.removeClass("d-none");

			username.removeClass('is-valid');
			username.addClass('is-invalid');

			password.removeClass('is-valid');
			password.addClass('is-invalid');

			console.log(err);

		});

	}
});

$(document).ready(function() {

	// exist a localstorage w/ token?
	// >> if yes, try to authToken
	// >> 401? refresh
	// >> 200? does nothing

	// does not exist?
	// >> index.html

	
	if(window.location.pathname !== "/login.html") {
		
		localStorage.setItem("whereTo",window.location.pathname);

		checkRedirect()

				.then((response) => {
					console.log("vai filhão!",response);
					window.location.href = localStorage.getItem("whereTo");
				})

				.catch((err) => {
					console.log("sai daqui seu maldito", err);
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.href = "login.html";

				});

	}

});
