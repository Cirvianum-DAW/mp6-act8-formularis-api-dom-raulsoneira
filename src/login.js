document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtenir les dades del formulari
    const nom = document.getElementById('nom').value;
    const cognom = document.getElementById('cognom').value;
    const email = document.getElementById('email').value;
    const contrasenya = document.getElementById('contrasenya').value;
    const dni = document.getElementById('dni').value;
    const dataNaixement = document.getElementById('dataNaixement').value;
    const genere = document.getElementById('genere').value;
    const acceptaTermes = document.getElementById('acceptaTermes').checked;

    // Validacions dels camps del formulari

    // validar que tots els camps estiguin omplerts

    if (
      !nom ||
      !cognom ||
      !email ||
      !contrasenya ||
      !dni ||
      !dataNaixement ||
      !genere
    ) {
      alert('Cal omplir tots els camps!!!');
      return;
    }

    if (!acceptaTermes) {
      alert('No has acceptat els termes i condicions.');
      return;
    }

    // La contrasenya ha de tenir almenys 6 caràcters
    if (contrasenya.length < 6) {
      alert('La contrasenya ha de tenir almenys 6 caracters');
      return;
    }

    // L'adreça de correu ha de tenir un format vàlid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("L'adreça de correu electrònic no té un format vàlid.");
      return;
    }

    // Verificar que l'usuari sigui major d'edat
    // Crear objectes Date per a la data de naixement de l'usuari i la data actual
    const birthDate = new Date(dataNaixement);
    const now = new Date();
    const birthYear = birthDate;

    // Calcular la diferència entre la data actual i la data de naixement en mil·lisegons
    const diff = now - birthYear;

    // Convertir la diferència a anys dividint pel nombre de mil·lisegons en un any
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Calcular l'edat en anys

    // Comprovar si l'usuari té menys de 18 anys
    if (age < 18) {
      alert("L'usuari ha de ser major d'edat per registrar-se.");
      return;
    }

    const idNumberRegex = /^[0-9A-Za-z]{1,10}$/;
    if (!idNumberRegex.test(dni)) {
      alert('El DNI/NIF no té un format vàlid.');
      return;
    }

    const formData = {
      nom,
      cognom,
      email,
      contrasenya,
      dni,
      dataNaixement,
      genere,
    };

    sessionStorage.setItem('formData', JSON.stringify(formData));

    const storedFromData = sessionStorage.getItem('formData');
    console.log(storedFromData);

    window.location.href = 'meteo.html';
  });
