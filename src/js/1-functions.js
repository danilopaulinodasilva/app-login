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

      console.log(response.status);

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

function refreshToken(token) {

  return new Promise((resolve,reject) => {

    fetch("http://localhost:3000/token", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "token": token
      }
    })

    .then(function (response) {
      response.json()

        .then(function (data) {
          resolve(data); // token novo
        });

    })

    .catch(err => {
      console.error(err);
    });

  });

}

function logout(token) {

}

function checkRedirect() {

  console.log("103: checkRedirect()");

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return new Promise((resolve, reject) => {

    const loginPage = "http://localhost:8080/index.html";

    if (accessToken == null || refreshToken === null) {

      console.log("112: vc não tem nada no localstorage");

      if (window.location.href !== loginPage) {
        // A url atual é DIFERENTE da que vc deve ir, some daqui
        reject(loginPage);

      }

    } else {

      console.log("144: vc tem algo no localstorage");

      try {

        console.log("151: vou tentar autenticar com accessToken");
        
        authToken(accessToken)

        .then((response) => {
          console.log("blz, ta liberado");
        })

        .catch((err) => {
          console.log("160: não consegui com accessToken, vou pegar outro token pra vc", err);

          refreshToken(refreshToken)

          .then((response) => {
          
            authToken(accessToken)

            .then((response) => {
              console.log("blz, ta liberado");
            })

            .catch((err) => {
              console.log("sai");
            });

            // localStorage.setItem("token",response);
            // console.log("blz, ta liberado");


          })

          .catch((err) => {
            reject(err);
          });

        });

      } catch (err) {
        console.log("176: outro erro que não 403", err);

      }

    }

  });



}
