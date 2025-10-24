console.log("app.js funcionando")

const API = "http://localhost:3000/lerveiculos";
const APIpagamento = "http://localhost:3000/atualizarpagamento";

async function carregar() {
    const res = await fetch(API);
    const dados = await res.json();
    const tabela = document.getElementById("tabela");

    tabela.innerHTML = "";

    console.log(dados)

    dados.forEach((carro) => {
        console.log(carro)
        tabela.innerHTML += `
            <tr>
                <td>${carro.id}</td>
                <td>${carro.placa}</td>
                <td>${carro.modelo}</td>
                <td>${carro.pago ? "Sim ✅" : "Não ❌"}</td>
                
                <td>
                <button onclick="pagar(${carro.id},${carro.pago})">
                PATCH ${carro.pago ? '<span style="color:blue">Cancelar</span>' :'<span style="color:green">Pagar</span>' }</button>
                   <button onclick="delete (${carro.id.delete})"> Deletar
            </button>
                </td>
            </tr>`
    });
}

async function pagar(id, pagoAtual) {
    console.log(id)
    console.log(pagoAtual)
    await fetch(`${APIpagamento}/${id}`,{
      method: "PATCH",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify({pago: !pagoAtual})  
    })
    carregar();
    
}

/// Ao abrir a pagina, chamaa função carregar
carregar();