console.log('Carreguei o Main');

const loginForm = $('#loginForm');
const username = $("#email");
const password = $("#password");
const erro = $(".alert");

loginForm.submit(function() {
    var form = $(this);
    if (form[0].checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
	  
    } else {
		event.preventDefault();
		event.stopPropagation();
		
		getToken(username.val(),password.val())

		.then((data) => {
			erro.html("");
			erro.addClass("d-none");

			form.addClass('was-validated');
			console.log(data);

			localStorage.setItem("accessToken",data.accessToken);
			localStorage.setItem("refreshToken",data.refreshToken);

		})

		.catch((err) => {
			erro.html(err.message);
			erro.removeClass("d-none");
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
