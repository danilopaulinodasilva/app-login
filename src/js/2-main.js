console.log('Carreguei o Main');

const loginForm = $('#loginForm');
const username = $("#email");
const password = $("#password");
const error = $(".alert-error");
const ok = $(".alert-ok");

username.blur(function() {
	validateUsername(username);
});

password.blur(function() {
	validatePassword(password);
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

			console.log(data);

			localStorage.setItem("accessToken",data.accessToken);
			localStorage.setItem("refreshToken",data.refreshToken);

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

	checkRedirect()

		.then((response) => {
			console.log(response);

		})

		.catch((err) => {
			console.log(err);
			
			localStorage.clear();
			window.location.href = err;

		});

	// authToken(localStorage.getItem("accessToken"))

	// 	.then((response) => {
	// 		console.log("Usuário autenticado, não faz nada");
	// 	})

	// 	.catch((err) => {
	// 		console.log("Usuário não autenticado, manda pro index.html");
	// 	});

});
