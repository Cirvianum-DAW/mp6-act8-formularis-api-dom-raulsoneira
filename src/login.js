document.getElementById('registerForm')
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

    if (!nom || !cognom || !email || !contrasenya || !dni || !dataNaixement || !genere) {
        alert('Cal omplir tots els camps!!!');
    }

    if (!acceptaTermes) {
        alert('No has acceptat els termes i condicions.');
    }

    // La contrasenya ha de tenir almenys 6 caràcters
    if (contrasenya.length < 6) {
        alert('La contrasenya ha de tenir almenys 6 caracters');
    }

    // L'adreça de correu ha de tenir un format vàlid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('L\'adreça de correu electrònic no té un format vàlid.');
    }

    if (dataNaixement < 18) {
        alert('L\'usuari ha de ser major d\'edat per registrar-se.'); 
    }

    const idNumberRegex = /^[0-9A-Za-z]{1,10}$/; 
    if (!idNumberRegex.test(dni)) {
        alert('El DNI/NIF no té un format vàlid.'); 
    }

    alert('Formulari enviat correctament!');
})