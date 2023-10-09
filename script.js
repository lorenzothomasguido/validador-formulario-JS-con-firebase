const firebaseConfig = {
    apiKey: "AIzaSyBs1f3Ah1zN8PnKLJgI_iKzm6N6YPv2SK4",
    authDomain: "datosformulariojs-demo.firebaseapp.com",
    projectId: "datosformulariojs-demo",
    storageBucket: "datosformulariojs-demo.appspot.com",
    messagingSenderId: "221628614497",
    appId: "1:221628614497:web:2a4057ddeb5942e69f2720",
    measurementId: "G-0HSS8WM1Z7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore 
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()
    
    //validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')
    
    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent= 'por favor, introduci tu nombre '
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    
    //validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('passwordError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = "La dirección de correo electrónico es válida."
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //validar contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');

    const contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (contrasenaEntrada.value.length < 8 && !contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'la contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un símbolo especial';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
    }

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
      

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert ('el formulario se envio con exito')
        document.getElementById('formulario').reset()
    }

})