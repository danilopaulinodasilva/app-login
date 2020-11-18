console.log('Carreguei o Main');

const loginForm = $('#loginForm');
const usernameField = $("#email");
const passwordField = $("#password");
const error = $(".alert-error");
const ok = $(".alert-ok");
const logoutBtn = $("#logout");

usernameField.on('blur', function() {
	validateUsername(usernameField);

});

passwordField.on('blur', function() {
	validatePassword(passwordField);

});

logoutBtn.on('click', function() {
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

loginForm.on('submit', function(event) {
	var form = $(this);
	
    if (form[0].checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();

		form.removeClass('was-validated');
		form.addClass('needs-validation');
		
		validateUsername(usernameField);
		validatePassword(passwordField);

	  
    } else {
		event.preventDefault();
		event.stopPropagation();
		
		getToken(usernameField.val(),passwordField.val())

		.then((data) => {

			form.addClass('was-validated');

			error.html("");
			error.addClass("d-none");
			
			ok.html("Sucesso! Você será redirecionado, aguarde...");
			ok.removeClass("d-none");
		
			usernameField.removeClass('is-invalid');
			passwordField.removeClass('is-invalid');

			localStorage.setItem("accessToken",data.accessToken);
			localStorage.setItem("refreshToken",data.refreshToken);

			window.location.pathname = localStorage.getItem("whereTo") || "/index.html";

		})

		.catch((err) => {
			error.html(err.message);
			error.removeClass("d-none");

			usernameField.removeClass('is-valid');
			usernameField.addClass('is-invalid');

			passwordField.removeClass('is-valid');
			passwordField.addClass('is-invalid');

			console.log(err);

		});

	}
});

$(function(){

	if(window.location.pathname !== "/login.html") {
		
		localStorage.setItem("whereTo",window.location.pathname);

		checkRedirect()

			.then((response) => {
				window.location.href = localStorage.getItem("whereTo");
			})

			.catch((err) => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "login.html";

			});

	}

});
