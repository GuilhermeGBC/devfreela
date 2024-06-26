function roleIsChecked() {
    let list = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of list){
        if(radioButton.checked === false){
            counter++;
        }
    }
    return counter !== list.length;
}

function cadastrar(){
    // Se ele entrou aqui, é porque o form está válido!
    if(roleIsChecked() == false) {
        Swal.fire({
            title: "Ops!",
            text: "É necessário marcar uma role!",
            icon: "error"
          });
        return;
    }

   let payload = {
    role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
    fullName: document.querySelector('#fullName').value,
    birthDate: document.querySelector('#birthDate').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value
   }
    // Enviar pra API
    fetch("https://6628790554afcabd0735dba9.mockapi.io/api/users", {
        method: 'POST', 
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: "Muito bem!",
            text: "Seu cadastro foi realizado com sucesso!",
            icon: "success",
            showCancelButton: false,

          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('userName', response.fullName);
                localStorage.setItem('role', response.role === "dev" ? "Desenvolvedor" : "Cliente");
                localStorage.setItem('idClient', response.id);
                window.location.href = 'list.html';
            }
          });
    })
    .catch(error => {
        alert("Ocorreu um erro inesperado!");
    });
}