

let vitrine_cards     = document.querySelector('.vitrine_cards')
let adicionarCarrinho = document.querySelectorAll('.button')
let carrinhoDeCompras = document.querySelector('.itens_adicionados')
let qtd               = document.querySelector('.qtd h3')
let total             = document.querySelector('.valorTotal h3')
let inputBusca        = document.querySelector('.pesquisa input')
let pesquisar         = document.querySelector('.pesquisa button')
let todos             = document.querySelector('.cabecalho_nav li strong')
let acessorios        = document.querySelector('.acessorios')
let calcados          = document.querySelector('.calcados')
let camisetas         = document.querySelector('.camisetas')
let totais            = document.querySelector('.totais')

vitrine_cards.addEventListener('click',adicionarNoCarrinho)
carrinhoDeCompras.addEventListener('click',removerTarefa)
pesquisar.addEventListener('click',function(){

    let pesquisaUsuario = inputBusca.value
    let result          = buscaPesquisa(pesquisaUsuario)

    if(result.length !== 0){

        listarProdutos(result)
    }

    


})

function listarProdutos (obj){

    vitrine_cards.innerHTML = ''

    for( let i = 0; i < obj.length; i++){

        let produto = obj[i]

        let card = criarProduto(produto)
        vitrine_cards.appendChild(card)
    }
    
}
listarProdutos(data)

function criarProduto(obj){
    
    let img            = obj.img
    let categoria      = obj.tag
    let titulo         = obj.nameItem
    let descricao      = obj.description
    let preco          = obj.value
    let precoFormatado = `R$ ${preco.toFixed(2)}`.replace('.',',')
    let button         = obj.addCart
    let id             = obj.id

    

    let tagLi           = document.createElement('li')

    tagLi.innerHTML     = 
        `<div class="imagem_vitrine">
            <img src=${img} alt=${titulo}>
        </div>
        <main class="descricao">
            <span>${categoria}</span>
            <h2>${titulo}</h2>
            <p>${descricao}</p>
            <h4>${precoFormatado}</h4>
            <p class="button" id='${id}'>${button}</p>
        </main>`

       
    
return tagLi
}

function criarProdutoCarrinho(obj){

    let img            = obj.img
    let titulo         = obj.nameItem
    let preco          = obj.value
    let precoFormatado = `R$ ${preco.toFixed(2)}`.replace('.',',')
    let id             = obj.id

    let tagLi           = document.createElement('li')

    tagLi.innerHTML     = 
    `
        <div>
            <img src=${img} alt=${titulo}>
         </div>
         <main>
            <h2>${titulo}</h2>
            <h4>${precoFormatado}</h4>
            <p id='${id}'>Remover produto</p>
         </main>`
    
    return tagLi
}

let quantidade = []

function adicionarNoCarrinho(event){

    let btn = event.target
    console.log(btn.className)
    if(carrinhoDeCompras.querySelector('.itens_adicionados h2').innerText == 'Carrinho vazio' && btn.className == 'button'){

        carrinhoDeCompras.innerHTML = ''
    }
    
    

    if(btn.className == 'button'){

    
        let tagLi = criarProdutoCarrinho(data[btn.id-1])  
        quantidade.push(data[btn.id-1]) 
        carrinhoDeCompras.appendChild(tagLi)
        criarTotais()
    }
    console.log(quantidade)

    // criarTotais()

}

function criarTotais(){
    
    totais.innerHTML =''

    let qtds = quantidade.length
    let totalCart = quantidade.reduce((initialValue,currentValue) => initialValue + currentValue.value,0)

    let quantidadeProduto = document.createElement('div')
    quantidadeProduto.setAttribute('class','qtd')
    let total = document.createElement('div')
    total.setAttribute('class','valorTotal')

    quantidadeProduto.innerHTML = `<p>Quantidade:</p>
    <h3>${qtds}</h3>`
    total.innerHTML = `<p>Total:</p>
    <h3>R$`+ `${totalCart.toFixed(2)}`.replace('.',',')+`</h3>`

    totais.appendChild(quantidadeProduto)
    totais.appendChild(total)

    

}

function removerTarefa(event){

    
    
    let click  = event.target
    console.log((click.closest('main').querySelector('h4').innerText))

        if(click.innerText == 'Remover produto'){
             quantidade.splice(0,1)
             click.closest('li').remove()
             criarTotais()

        }
        if(quantidade.length == 0){

            totais.innerHTML = ''
            carrinhoDeCompras.innerHTML = `<div class='carrinho_vazio'>
            <h2>Carrinho vazio</h2>
            <p>Adicione itens</p>
        </div>`

        }
    
    

}

function buscaPesquisa(string){   

    let resultadoBusca = []
    
    for( let i = 0; i < data.length; i++){

        if(string.trim().toLowerCase() == data[i].nameItem.toLowerCase() && string.trim().toLowerCase() !== ''){
            
            resultadoBusca.push(data[i])
            inputBusca.value = ''
        }
    }
    inputBusca.value = ''
    return resultadoBusca
}

todos.addEventListener('click',function(){

        listarProdutos(data)
    

})

acessorios.addEventListener('click',function(){

    let tag    = acessorios.innerText
    console.log(tag)
    let result = pesquisarTag(tag)

    if(result.length !== 0){

        listarProdutos(result)
    }

})
calcados .addEventListener('click',function(){

    let tag    = calcados .innerText
    console.log(tag)
    let result = pesquisarTag(tag)

    if(result.length !== 0){

        listarProdutos(result)
    }

})
camisetas.addEventListener('click',function(){

    let tag    = camisetas.innerText
    console.log(tag)
    let result = pesquisarTag(tag)

    if(result.length !== 0){

        listarProdutos(result)
    }

})

function pesquisarTag(string){
    
    vitrine_cards.innerHTML = ''    
    let resultadoBusca = []
    
    for( let i = 0; i < data.length; i++){

        if(string.trim().toLowerCase() == data[i].tag[0].toLowerCase()){
            
            resultadoBusca.push(data[i])
            
        }
    }
    
    return resultadoBusca
}