const titulo = document.querySelector("#titulo")
const linguagem = document.querySelector("#linguagem")
const categoria = document.querySelector("#categoria")
const descricao = document.querySelector("#descricao")
const video = document.querySelector("#video")
const btnSalvar = document.querySelector("#btn-salvar")
const btnLimpar = document.querySelector("#btn-limpar")
const cardItens = document.querySelector(".card-itens")
const divBotao = document.querySelector(".btn")

const form = document.querySelector("#form-recipe")

form.addEventListener("submit", (event) => {
  event.preventDefault()
})

btnSalvar.addEventListener("click", adicionaItensLista)
btnLimpar.addEventListener("click", limpaForm)

let listaArr = []

function montaCard(item, indice) {

  const div = document.createElement("div")
  cardItens.appendChild(div)
  const hTitulo = document.createElement("h3")
  hTitulo.innerText = item[0]
  const pLinguagem = document.createElement("p")
  pLinguagem.innerText = item[1]
  const pCategoria = document.createElement("p")
  pCategoria.innerText = item[2]
  const pDescricao = document.createElement("p")
  pDescricao.innerText = item[3]
  const pVideo = document.createElement("p")
  pVideo.innerText = item[4]

  div.appendChild(hTitulo)
  div.appendChild(pLinguagem)
  div.appendChild(pCategoria)
  div.appendChild(pDescricao)
  div.appendChild(pVideo)

  const btnExcluir = document.createElement("button")
  btnExcluir.innerText = "Excluir"
  const btnEditar = document.createElement("button")
  btnEditar.innerText = "Editar"
  const btnVideo = document.createElement("button")
  btnVideo.innerText = "Video"

  btnExcluir.addEventListener("click", () => removeItemLista(indice))
  div.appendChild(btnExcluir)
  btnEditar.addEventListener("click", () => editaItemLista(indice))
  div.appendChild(btnEditar)
  btnVideo.addEventListener("click", () => abreVideo(indice))
  div.appendChild(btnVideo)

}

function adicionaItensLista() {
  let itens = []
  itens.push(titulo.value)
  itens.push(linguagem.value)
  itens.push(categoria.value)
  itens.push(descricao.value)
  itens.push(video.value)

  listaArr.push(itens)

  atualizaLista()
}

function atualizaLista() {
  cardItens.innerHTML = ''
  listaArr.forEach((item, indice) => {
    montaCard(item, indice)
  })
}

function limpaForm() {
  titulo.value = ""
  linguagem.value = ""
  categoria.value = ""
  descricao.value = ""
  video.value = ""
}

function removeItemLista(indice) {
  listaArr = listaArr.filter((_, i) => i !== indice)
  atualizaLista()
}

function editaItemLista(indice) {
  listaArr.filter((i, idx) => {
    if (idx === indice) {
      titulo.value = i[0]
      linguagem.value = i[1]
      categoria.value = i[2]
      descricao.value = i[3]
      video.value = i[4]
    }
  })

  console.log(listaArr)
  console.log(indice)

  const btnConfirmaEdicao = document.createElement("button")
  btnConfirmaEdicao.innerText = "Editar"
  divBotao.appendChild(btnConfirmaEdicao)

  btnConfirmaEdicao.addEventListener("click", () => confirmaEdicao(indice))
}

function confirmaEdicao(indice) {

  listaArr.filter((i, idx) => {
    if (idx === indice) {
      i = []
      i.push(titulo.value)
      i.push(linguagem.value)
      i.push(categoria.value)
      i.push(descricao.value)
      i.push(video.value)
      console.log(i)
      console.log(idx)
    }
  })

}

