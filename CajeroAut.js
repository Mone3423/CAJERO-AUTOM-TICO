document.addEventListener("DOMContentLoaded", function() {
    var cuentas = [
        { nombre: "Mali", saldo: 200, contraseña: "clave1" },
        { nombre: "Gera", saldo: 290, contraseña: "clave2" },
        { nombre: "Maui", saldo: 67, contraseña: "clave3" }
    ]; 

    const formInicio = document.getElementById("formInicio");
    const codigoCuentaInput = document.getElementById("codigoCuenta");
    const contraseñaInput = document.getElementById("contraseña");
    const opcionesCajeroSection = document.getElementById("opcionesCajero");
    const saldoPantalla = document.createElement("p");
    saldoPantalla.textContent = ""; 
    opcionesCajeroSection.appendChild(saldoPantalla);

    var cuentaEncontrada; 

    // Formulario de inicio
    formInicio.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const codigoCuenta = codigoCuentaInput.value;
        const contraseña = contraseñaInput.value;

        // Buscar la cuenta
        cuentaEncontrada = cuentas.find(cuenta => cuenta.nombre === codigoCuenta && cuenta.contraseña === contraseña);

        if (cuentaEncontrada) {
            mostrarOpcionesCajero();
        } else {
            alert("Código de cuenta o contraseña incorrectos. Por favor, inténtelo de nuevo.");
            codigoCuentaInput.value = ""; 
            contraseñaInput.value = ""; 
            codigoCuentaInput.focus(); 
        }
    });

    // Función para mostrar las opciones del cajero automático
    function mostrarOpcionesCajero() {
        const inicioSection = document.getElementById("inicio");
        inicioSection.style.display = "none"; 
        opcionesCajeroSection.style.display = "block"; 
    }

    // Consultar saldo
    document.getElementById("btnConsultaSaldo").addEventListener("click", function() {
        saldoPantalla.textContent = "Saldo actual: $" + cuentaEncontrada.saldo.toFixed(2);
    });

    // Ingresar monto
    document.getElementById("btnAnadir").addEventListener("click", function() {
        const monto = prompt("Ingrese el monto a depositar:");
        if (monto !== null && !isNaN(monto) && monto !== "") {
            const montoDecimal = parseFloat(monto);
            if (montoDecimal >= 10 && montoDecimal + cuentaEncontrada.saldo <= 999) {
                cuentaEncontrada.saldo += montoDecimal;
                saldoPantalla.textContent = "Monto depositado: $" + montoDecimal.toFixed(2) + ". Nuevo saldo: $" + cuentaEncontrada.saldo.toFixed(2);
            } else {
                alert("El monto debe ser mayor o igual a $10 y el saldo total no debe superar $999.");
            }
        }
    });

    // Retirar monto
    document.getElementById("btnRetiroRapido").addEventListener("click", function() {
        const opcion = prompt("Seleccione una opción de retiro rápido: 1. $10, 2. $20, 3. $50, 4. $100");
        let montoRetirado;
        if (opcion === "1") {
            montoRetirado = 10;
        } else if (opcion === "2") {
            montoRetirado = 20;
        } else if (opcion === "3") {
            montoRetirado = 50;
        } else if (opcion === "4") {
            montoRetirado = 100;
        } else {
            alert("Opción inválida");
            return;
        }
        if (cuentaEncontrada.saldo >= montoRetirado) {
            cuentaEncontrada.saldo -= montoRetirado;
            saldoPantalla.textContent = "Monto retirado: $" + montoRetirado.toFixed(2) + ". Nuevo saldo: $" + cuentaEncontrada.saldo.toFixed(2);
        } else {
            alert("Saldo insuficiente");
        }
    });

    // Retirar e ingresar monto
    document.getElementById("btnRetiro").addEventListener("click", function() {
        const monto = prompt("Ingrese el monto a retirar:");
        if (monto !== null && !isNaN(monto) && monto !== "") {
            const montoDecimal = parseFloat(monto);
            if (montoDecimal >= 10 && cuentaEncontrada.saldo - montoDecimal >= 10) {
                cuentaEncontrada.saldo -= montoDecimal;
                saldoPantalla.textContent = "Monto retirado: $" + montoDecimal.toFixed(2) + ". Nuevo saldo: $" + cuentaEncontrada.saldo.toFixed(2);
            } else {
                alert("El monto debe ser mayor o igual a $10 y no debe superar el saldo disponible.");
            }
        }
    });
    
    
});

