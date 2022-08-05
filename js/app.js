const titulo = document.querySelector("#titulo")
const linguagem = document.querySelector("#linguagem")
const categoria = document.querySelector("#categoria")
const descricao = document.querySelector("#descricao")
const video = document.querySelector("#video")
const btnSalvar = document.querySelector("#btn-salvar")
const btnLimpar = document.querySelector("#btn-limpar")
const cardItens = document.querySelector(".card-itens")
const divBotao = document.querySelector(".btn")
const barraPesquisa = document.querySelector("#barra-pesquisa")
const btnPesquisa = document.querySelector("#btn-pesquisa")
const pTotal = document.querySelector("#total")
const pFront = document.querySelector("#front")
const pBack = document.querySelector("#back")
const pFull = document.querySelector("#full")
const pSoft = document.querySelector("#soft")

const form = document.querySelector("#form-recipe")

form.addEventListener("submit", (event) => {
  event.preventDefault()
})

btnSalvar.addEventListener("click", adicionaItensLista)
btnLimpar.addEventListener("click", limpaForm)
btnPesquisa.addEventListener("click", pesquisaCard)
barraPesquisa.addEventListener("input", atualizaLista)

let listaArr = []
recuperaLista()
calculaDados()
limpaForm()

function montaCard(item, indice) {

  const div = document.createElement("div")
  cardItens.appendChild(div)

  const hTitulo = document.createElement("h3")
  hTitulo.innerHTML = `<strong>Título:</strong> ${item[0]}`
  const pLinguagem = document.createElement("p")
  pLinguagem.innerHTML = `<strong>Linguagem/Skill:</strong> ${item[1]}`
  const pCategoria = document.createElement("p")
  pCategoria.innerHTML = `<strong>Categoria:</strong> ${item[2]}`
  const pDescricao = document.createElement("p")
  pDescricao.innerText = item[3]
  // const pVideo = document.createElement("p")
  // pVideo.innerText = item[4]

  div.appendChild(hTitulo)
  div.appendChild(pLinguagem)
  div.appendChild(pCategoria)
  div.appendChild(pDescricao)
  // div.appendChild(pVideo)

  const btnExcluir = document.createElement("button")
  btnExcluir.setAttribute("title", "Excluir")
  btnExcluir.innerHTML = `<i class="fa fa-trash"></i>`
  const btnEditar = document.createElement("button")
  btnEditar.setAttribute("title", "Editar")
  btnEditar.innerHTML = `<i class="fa fa-file-o"></i>`
  const btnVideo = document.createElement("button")
  btnVideo.setAttribute("title", "Link Vídeo")
  btnVideo.innerHTML = `<i class="fa fa-play"></i>`

  btnExcluir.addEventListener("click", () => removeItemLista(indice))
  div.appendChild(btnExcluir)
  btnEditar.addEventListener("click", () => editaItemLista(indice))
  btnEditar.setAttribute("id", "btn-editar")
  div.appendChild(btnEditar)
  btnVideo.addEventListener("click", () => acessaVideo(indice))
  div.appendChild(btnVideo)

}

function pesquisaCard() {
  const novaListaArr = []
  const substr = barraPesquisa.value.toLowerCase()

  listaArr.map(item => {
    const str = item[0].toLowerCase()
    if (str.indexOf(substr) !== -1) {
      console.log("true")
      novaListaArr.push(item)
    }
  })

  cardItens.innerHTML = ''
  novaListaArr.forEach((item, indice) => {
    montaCard(item, indice)
  })
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
  salvaLista()
  calculaDados()
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

  ///ToDo: validar existencia do botao antes de remover
  const btnConfirmaEdicao = document.getElementById("btn-edicao")
  divBotao.removeChild(btnConfirmaEdicao)

}

function removeItemLista(indice) {
  listaArr = listaArr.filter((_, i) => i !== indice)
  atualizaLista()
  salvaLista()
  calculaDados()
}

function editaItemLista(indice) {

  const btnEditar = document.querySelector("#btn-editar")
  btnEditar.disabled = true
  btnSalvar.style.display = "none"

  listaArr.filter((i, idx) => {
    if (idx === indice) {
      titulo.value = i[0]
      linguagem.value = i[1]
      categoria.value = i[2]
      descricao.value = i[3]
      video.value = i[4]
    }
  })

  const btnConfirmaEdicao = document.createElement("button")
  btnConfirmaEdicao.setAttribute("id", "btn-edicao")
  btnConfirmaEdicao.innerText = "Editar"
  divBotao.appendChild(btnConfirmaEdicao)
  btnConfirmaEdicao.addEventListener("click", () => confirmaEdicao(indice))
}

function confirmaEdicao(indice) {

  const newArr = listaArr.find((_, idx) => idx === indice)

  newArr[0] = titulo.value
  newArr[1] = linguagem.value
  newArr[2] = categoria.value
  newArr[3] = descricao.value
  newArr[4] = video.value

  listaArr.forEach((i, idx) => {
    if (indice === idx) {
      i = newArr
    }
  })

  atualizaLista()
  salvaLista()
  calculaDados()

  const btnEditar = document.querySelector("#btn-editar")
  btnEditar.disabled = false
  btnSalvar.style.display = "initial"
  const btnConfirmaEdicao = document.querySelector("#btn-edicao")
  btnConfirmaEdicao.style.display = "none"

  limpaForm()
}

function acessaVideo(indice) {
  const newArr = listaArr.find((_, idx) => idx === indice)
  const win = window.open(newArr[4], '_blank')
  win.focus()
}

function calculaDados() {

  let total = 0
  let front = 0
  let back = 0
  let full = 0
  let soft = 0

  for (let i = 0; i < listaArr.length; i++) {
    const element = listaArr[i]
    if (element[2] === "front") {
      total++
      front++
    }
    if (element[2] === "back") {
      total++
      back++
    }
    if (element[2] === "full") {
      total++
      full++
    }
    if (element[2] === "soft") {
      total++
      soft++
    }
    if (!element[2]) {
      return false
    }
  }

  pTotal.innerText = total
  pFront.innerText = front
  pBack.innerText = back
  pFull.innerText = full
  pSoft.innerText = soft

}

function salvaLista() {
  const listaJSON = JSON.stringify(listaArr)
  console.log(listaJSON)
  localStorage.setItem("lista", listaJSON)
}

function recuperaLista() {
  const listaJSON = localStorage.getItem("lista")

  if (localStorage.length === 0 || localStorage.lista === '[]') {
    alert("Não existe itens cadastrados!")
  } else {
    listaArr = JSON.parse(listaJSON)
    atualizaLista()
  }

}