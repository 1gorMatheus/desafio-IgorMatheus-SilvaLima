const cardapio = [
    {
      codigo: "cafe",
      descricao: "Café",
      valor: 3.00,
    },
    {
      codigo: "chantily",
      descricao: "Chantily (extra do Café)",
      valor: 1.50,
    },
    {
      codigo: "suco",
      descricao: "Suco Natural",
      valor: 6.20,
    },
    {
      codigo: "sanduiche",
      descricao: "Sanduíche",
      valor: 6.50,
    },
    {
      codigo: "queijo",
      descricao: "Queijo (extra do Sanduíche)",
      valor: 2.00,
    },
    {
      codigo: "salgado",
      descricao: "Salgado",
      valor: 7.25,
    },
    {
      codigo: "combo1",
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.50,
    },
    {
      codigo: "combo2",
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.50,
    },
  ];

  class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        

        if (metodoDePagamento !== "debito" && metodoDePagamento !== "credito" && metodoDePagamento !== "dinheiro") {
            return ("Forma de pagamento inválida!");
        }
        if (itens.length === 0 || (itens.length === 1 && itens[0].trim() === "")) {
          return ("Não há itens no carrinho de compra!") 
        }
        
        let valorTotal = 0;
        let itemPrincipal = []
        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            const itemNoCardapio = cardapio.find((item) => item.codigo === codigo);
            if (!itemNoCardapio) {
                return ("Item inválido!" );
            }
            if (quantidade <= 0 ) {
                return ("Quantidade inválida!" );
            }
            if(codigo === "cafe" || codigo === "sanduiche"){
              itemPrincipal.push(codigo)
            }
       
            if ((codigo === "chantily" || codigo === "queijo") && (!itemPrincipal.includes("cafe") && !itemPrincipal.includes("sanduiche"))) {
              return ("Item extra não pode ser pedido sem o principal");
          }
          
          valorTotal += itemNoCardapio.valor * quantidade;
        }

        if(metodoDePagamento === "dinheiro"){
          valorTotal -= valorTotal * 0.05;
        }else if(metodoDePagamento === "credito") {
          valorTotal += valorTotal * 0.03;
        }
    
        return (`R$ ${valorTotal.toFixed(2)}`.replace('.', ','));
    }
}

let testCaixa = new CaixaDaLanchonete();
let mensagensErro = testCaixa.calcularValorDaCompra('debito', ['queijo,1', 'cafe,1']);

console.log(mensagensErro);

export { CaixaDaLanchonete };
