if(localStorage.getItem("guid") !== null) {

  $('body').on('click', '#logout', function() {

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
  

  const databaseName = "carsystem";

  const tbar = [{
    text: 'Exportar em .xlsx',
    handler: function () {

      const filename = `leads-${databaseName}`;
      const guid = localStorage.getItem("guid");

      download(guid, filename + ".xlsx");

      this.exportToExcel({
        fileName: filename,
        header: true,
        all: true
      });

    }
  }];

  document.addEventListener("DOMContentLoaded", function () {

    new FancyGrid({
      title: 'Você está visualizando o banco de dados de Carsystem',
      renderTo: 'table',
      paging: true,
      height: 500,
      theme: 'gray',
      exporter: true,
      tbar: tbar,
      data: data,
      defaults: {
        type: 'string',
        editable: true,
        sortable: true,
        locked: false,
        filter: {
          header: true,
          emptyText: 'Filtrar'
        }
      },
      clicksToEdit: 1,
      columns: [{
        index: 'company',
        flex: true,
        locked: true,
        title: 'Company'
      }, {
        flex: true,
        index: 'name',
        title: 'Name'
      }, {
        flex: true,
        index: 'surname',
        title: 'Sur Name'
      }, {
        flex: true,
        index: 'age',
        title: 'Age',
        type: 'number'
      }]
    });

    
  });

  window.addEventListener('load', function(){
      const fancyPanelHeaderTools = document.querySelector("#fancy-gen-36 > div.fancy-panel-header > div.fancy-panel-header-tools");
      fancyPanelHeaderTools.innerHTML = `<button id='logout' class='form-control btn btn-xs m-1 btn-danger'><svg enable-background="new 0 0 512 512"  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:svgjs="http://svgjs.com/svgjs"><path d="m256 0c-141.158 0-256 114.842-256 256s114.842 256 256 256 256-114.842 256-256-114.842-256-256-256zm-23.273 116.364c0-12.853 10.42-23.273 23.273-23.273s23.273 10.42 23.273 23.273v99.739c0 12.853-10.42 23.273-23.273 23.273s-23.273-10.42-23.273-23.273zm23.273 302.545c-81.579 0-147.948-66.369-147.948-147.948 0-36.346 13.309-71.297 37.474-98.413 8.552-9.598 23.262-10.44 32.859-1.89 9.596 8.552 10.44 23.262 1.89 32.86-16.558 18.579-25.678 42.53-25.678 67.443 0 55.913 45.489 101.402 101.402 101.402s101.402-45.489 101.402-101.402c0-24.916-9.118-48.867-25.676-67.443-8.554-9.595-7.708-24.306 1.888-32.858 9.593-8.552 24.306-7.709 32.858 1.888 24.166 27.113 37.475 62.062 37.475 98.413.002 81.579-66.367 147.948-147.946 147.948z" fill="#fff" xmlns="http://www.w3.org/2000/svg" data-original="#fff"/></svg> Fazer logout</button>`;
      
  });

  var data = [{
    name: 'Ted',
    surname: 'Smith',
    position: 'Java Developer',
    email: 'ted.smith@gmail.com',
    company: 'Electrical Systems',
    age: 30,
    education: 'High School Of Cambridge',
    knownledge: 'Java, Ruby'
  }, {
    name: 'Ed',
    surname: 'Johnson',
    position: 'C/C++ Market Data Developer',
    email: 'ed.johnson@gmail.com',
    company: 'Energy and Oil',
    age: 35,
    education: 'High School Of Cambridge',
    knownledge: 'C++'
  }, {
    name: 'Sam',
    surname: 'Williams',
    position: 'Technical Analyst',
    email: 'sam.williams@gmail.com',
    company: 'Airbus',
    age: 38,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Alexander',
    surname: 'Brown',
    position: 'Project Manager',
    email: 'alexander.brown@gmail.com',
    company: 'Renault',
    age: 24,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Nicholas',
    surname: 'Miller',
    position: 'Senior Software Engineer',
    email: 'nicholas.miller@gmail.com',
    company: 'Adobe',
    age: 33,
    education: 'High School Of Cambridge',
    knownledge: 'Unix, C/C++'
  }, {
    name: 'Andrew',
    surname: 'Thompson',
    position: 'Agile Project Manager',
    email: 'andrew.thompson@gmail.com',
    company: 'Google',
    age: 28,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Ryan',
    surname: 'Walker',
    position: 'Application Support Engineer',
    email: 'ryan.walker@gmail.com',
    company: 'Siemens',
    age: 39,
    education: 'High School Of Cambridge',
    knownledge: 'ActionScript'
  }, {
    name: 'John',
    surname: 'Scott',
    position: 'Flex Developer',
    email: 'john.scott@gmail.com',
    company: 'Cargo',
    age: 45,
    education: 'High School Of Cambridge',
    knownledge: 'Flex'
  }, {
    name: 'James',
    surname: 'Phillips',
    position: 'Senior C++/C# Developer',
    email: 'james.phillips@gmail.com',
    company: 'Pro bugs',
    age: 30,
    education: 'High School Of Cambridge',
    knownledge: 'C/C++, Unix'
  }, {
    name: 'Brian',
    surname: 'Edwards',
    position: 'UNIX/C++ Developer',
    email: 'brian.edwards@gmail.com',
    company: 'IT Consultant',
    age: 23,
    education: 'High School Of Cambridge',
    knownledge: 'C/C++ Unix'
  }, {
    name: 'Jack',
    surname: 'Richardson',
    position: 'Ruby Developer',
    email: 'jack.richardson@gmail.com',
    company: 'Europe IT',
    age: 24,
    education: 'High School Of Cambridge',
    knownledge: 'Ruby'
  }, {
    name: 'Alex',
    surname: 'Howard',
    position: 'CSS3/HTML5 Developer',
    email: 'alex.howard@gmail.com',
    company: 'Cisco',
    age: 27,
    education: 'High School Of Cambridge',
    knownledge: 'CSS3/HTML5'
  }, {
    name: 'Carlos',
    surname: 'Wood',
    position: 'Node.js Developer',
    email: 'carlos.wood@gmail.com',
    company: 'HP',
    age: 36,
    education: 'High School Of Cambridge',
    knownledge: 'Node.js'
  }, {
    name: 'Adrian',
    surname: 'Russell',
    position: 'Frontend Developer',
    email: 'adrian.russell@gmail.com',
    company: 'Micro Systems',
    age: 31,
    education: 'High School Of Cambridge',
    knownledge: 'HTML, JavaScript'
  }, {
    name: 'Jeremy',
    surname: 'Hamilton',
    position: 'Scala Developer',
    email: 'jeremy.hamilton@gmail.com',
    company: 'Big Machines',
    age: 30,
    education: 'High School Of Cambridge',
    knownledge: 'Scala'
  }, {
    name: 'Ivan',
    surname: 'Woods',
    position: 'Objective C Developer',
    email: 'ivan.woods@gmail.com',
    company: '',
    age: 24,
    education: 'High School Of Cambridge',
    knownledge: 'Objective C'
  }, {
    name: 'Peter',
    surname: 'West',
    position: 'PHP/HTML Developer',
    email: 'peters.west@gmail.com',
    company: 'Adobe',
    age: 26,
    education: 'High School Of Cambridge',
    knownledge: 'PHP/HTML'
  }, {
    name: 'Scott',
    surname: 'Simpson',
    position: 'Designer',
    email: 'scott.simpson@gmail.com',
    company: 'IBM',
    age: 29,
    education: 'High School Of Cambridge',
    knownledge: 'Adobe PhotoShop'
  }, {
    name: 'Lorenzo',
    surname: 'Tucker',
    position: 'Architect',
    email: 'lorenzo.tucker@gmail.com',
    company: 'Intel',
    age: 29,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Randy',
    surname: 'Grant',
    position: 'Engineer',
    email: 'randy.grant@gmail.com',
    company: 'Bridges',
    age: 30,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Arthur',
    surname: 'Gardner',
    position: 'Analytic',
    email: 'arthur.gardner@gmail.com',
    company: 'Google',
    age: 31,
    education: 'High School Of Cambridge',
    knownledge: ''
  }, {
    name: 'Orlando',
    surname: 'Ruiz',
    position: 'Unit Testing Developer',
    email: 'orlando.ruiz@gmail.com',
    company: 'Apple',
    age: 32,
    education: 'High School Of Cambridge',
    knownledge: ''
  }];

}
