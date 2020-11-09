console.log('Carreguei o Functions');

function getToken(username, password) {

  return new Promise(async (resolve, reject) => {

    const userData = {
      "username": username,
      "password": password
    };

    try {

      const response = await fetch("http://localhost:3000/login", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(userData)
      });

      switch (response.status) {

        case 401:
          reject(await response.json());
          return;

        case 200:
          resolve(await response.json());
          return;

        default:
          reject(response.statusText);
          return;
      }

    } catch (err) {
      reject({
        "message": err
      });
    }

  });


}

function authToken(token) {

  return new Promise(async (resolve, reject) => {

    try {

      const response = await fetch("http://localhost:3000/auth", {
        "method": "POST",
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      });

      switch (response.status) {

        case 401:
          reject(await response.json());
          return;

        case 201:
          resolve(await response.json());
          return;
        
        case 403:
          reject(await response.json());
          return;

        default:
          reject(response.statusText);
          return;
      }

    } catch (err) {
      reject({
        "message": err
      });
    }


  });

}

function newToken(token) {

  return new Promise(async (resolve,reject) => {

    try {

      const body = {
        "token": token
      };

      const response = await fetch("http://localhost:3000/token", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
      });

      switch (response.status) {

        case 401:
          reject(await response.json());
          return;

        case 200:
          resolve(await response.json());
          return;
        
        case 403:
          reject(await response.json());
          return;

        default:
          console.log(response);
          reject(response.statusText);
          return;
      }
      
    } catch (err) {

      reject({
        "message": err
      });

    }

  });

}

function logout(token) {

}

function checkRedirect() {

  console.log("Você não está em /login.html vou chamar o checkRedirect()");

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return new Promise((resolve, reject) => {

    const loginPage = "/login.html";

    if (accessToken == null || refreshToken === null) {

      // console.log("Você não tem nada no localstorage, redirect");

      if (window.location.pathname !== loginPage) {
        reject(loginPage);

      }

    } else {

      // console.log("Você tem algo no localstorage");

      try {

        // console.log("Vou tentar autenticar com accessToken");
        
        authToken(accessToken)

        .then((response) => {
          console.log("Consegui autenticar o seu token, acesso liberado, pode ficar na página");
        })

        .catch((err) => {

          console.log("Não consegui com accessToken, vou pegar outro token pra você usando newToken()", err);

          newToken(refreshToken)

          .then((response) => {
            
            console.log("Ok, consegui um novo token pra você", response);

            authToken(accessToken)

              .then((response) => {
                // console.log("174",response);
                // console.log("newToken blz, ta liberado");

              })

              .catch((err) => {
                // console.log("179",err);
                // console.log("sai");

              });

          })

          .catch((err) => {
            reject(err);
          });

        });

      } catch (err) {
        // console.log("176: outro erro que não 403", err);

      }

    }

  });

}

function emptyField(field) {
  if (field.val() === "" && field.val().length === 0 || field.val() == null)
  return true;
  return false;

}

function regexField(field, regex) {
  if (field.val().match(regex))
  return true;
  return false;

}