import {
  validaTitulo,
  validaSkill,
  validaCategoria,
  validaDescricao,
  validaVideo,
  msgSalvar,
  msgEditar
} from "./utils.js"

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

const form = document.querySelector("#form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
})

btnSalvar.addEventListener("click", adicionaItensLista)
btnLimpar.addEventListener("click", limpaForm)
btnPesquisa.addEventListener("click", pesquisaCard)
barraPesquisa.addEventListener("input", atualizaLista)

let listaArr = []
let listaArrPesquisa = []
recuperaLista()
calculaDados()
limpaForm()
barraPesquisa.value = ''

function montaCard(item, indice) {

  const div = document.createElement("div")
  cardItens.appendChild(div)

  const hTitulo = document.createElement("h3")
  hTitulo.innerHTML = `${item[0]}`
  const pLinguagem = document.createElement("p")
  pLinguagem.innerHTML = `<strong>Linguagem/Skill:</strong> ${item[1]}`
  const pCategoria = document.createElement("p")
  pCategoria.innerHTML = `<strong>Categoria:</strong> ${item[2]}`
  const pDescricao = document.createElement("p")
  pDescricao.innerText = item[3]

  div.appendChild(hTitulo)
  div.appendChild(pLinguagem)
  div.appendChild(pCategoria)
  div.appendChild(pDescricao)

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
  div.appendChild(btnEditar)
  btnVideo.addEventListener("click", () => acessaVideo(indice))
  div.appendChild(btnVideo)

  if (!item[4]) {
    btnVideo.disabled = true
  }

}

function pesquisaCard() {

  const substr = barraPesquisa.value.toLowerCase()
  listaArr.map(item => {
    const str = item[0].toLowerCase()
    if (str.indexOf(substr) !== -1) {
      listaArrPesquisa.push(item)
    }
  })

  cardItens.innerHTML = ''
  listaArrPesquisa.forEach((item, indice) => {
    montaCard(item, indice)
  })

}

function adicionaItensLista() {
  let itens = []

  if (!validaTitulo(titulo.value)
    || !validaSkill(linguagem.value)
    || !validaCategoria(categoria.value)
    || !validaDescricao(descricao.value)
    || !validaVideo(video.value)) {
    return
  } else {
    itens.push(titulo.value)
    itens.push(linguagem.value)
    itens.push(categoria.value)
    itens.push(descricao.value)
    itens.push(video.value)

    let ultimoElementoArr = []
    ultimoElementoArr = listaArr[listaArr.length - 1]
    let contadorId = 0
    contadorId = !ultimoElementoArr ? contadorId = 0 : ultimoElementoArr[ultimoElementoArr.length - 1]
    contadorId++
    itens.push(contadorId)

    listaArr.push(itens)

    atualizaLista()
    salvaLista()
    msgSalvar()
    calculaDados()
    limpaForm()
  }

}

function atualizaLista() {
  listaArrPesquisa = []

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

  let arrControle = listaArrPesquisa.length > 0 ? listaArrPesquisa : listaArr

  if (window.confirm("Deseja excluir a da dica?")) {

    let elExcluido = arrControle.find((_, idx) => idx === indice)
    listaArr = listaArr.filter((item, _) => item !== elExcluido)

    atualizaLista()
    salvaLista()
    calculaDados()
  } else {
    return
  }
}

function editaItemLista(indice) {

  btnSalvar.disabled = true
  btnLimpar.disabled = true

  const childNodes = cardItens.getElementsByTagName("button")
  for (let node of childNodes) {
    node.disabled = true
  }

  const arrControle = listaArrPesquisa.length > 0 ? listaArrPesquisa : listaArr

  arrControle.filter((i, idx) => {
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

  msgEditar()
}

function confirmaEdicao(indice) {

  const arrControle = listaArrPesquisa.length > 0 ? listaArrPesquisa : listaArr

  const newArr = arrControle.find((_, idx) => idx === indice)

  let ultimoElementoArr = newArr[newArr.length - 1]

  if (!validaTitulo(titulo.value)
    || !validaSkill(linguagem.value)
    || !validaCategoria(categoria.value)
    || !validaDescricao(descricao.value)
    || !validaVideo(video.value)) {
    return
  } else {
    newArr[0] = titulo.value
    newArr[1] = linguagem.value
    newArr[2] = categoria.value
    newArr[3] = descricao.value
    newArr[4] = video.value
    newArr[5] = ultimoElementoArr
  }

  if (window.confirm("Deseja editar a dica?")) {
    listaArr.forEach((i, idx) => {
      if (i[5] === newArr[5]) {
        i = newArr
      }
    })

    atualizaLista()
    salvaLista()
    calculaDados()
  }

  const childNodes = cardItens.getElementsByTagName("button")
  for (let node of childNodes) {
    node.disabled = false
  }

  btnSalvar.disabled = false
  btnLimpar.disabled = false

  const btnConfirmaEdicao = document.querySelector("#btn-edicao")
  btnConfirmaEdicao.remove()

  limpaForm()
}

function acessaVideo(indice) {

  const arrControle = listaArrPesquisa.length > 0 ? listaArrPesquisa : listaArr

  const newArr = arrControle.find((_, idx) => idx === indice)
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
    if (element[2] === "FrontEnd") {
      total++
      front++
    }
    if (element[2] === "BackEnd") {
      total++
      back++
    }
    if (element[2] === "FullStack") {
      total++
      full++
    }
    if (element[2] === "SoftSkill") {
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