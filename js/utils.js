export function validaTitulo(item) {
    if (!item) {
        alert("Campo Título Obrigatório")
        return false
    }
    if (item.length < 8 || item.length >= 64) {
        alert("Campo Título deve ter entre 8 e 64 caracteres")
        return false
    }
    return true
}

export function validaSkill(item) {
    if (!item) {
        alert("Campo Linguagem/Skill Obrigatório")
        return false
    }
    if (item.length < 4 || item.length >= 16) {
        alert("Campo Linguagem/Skill deve ter entre 4 e 16 caracteres")
        return false
    }
    return true
}

export function validaCategoria(item) {
    if (!item) {
        alert("Campo Categoria Obrigatório")
        return false
    }
    return true
}

export function validaDescricao(item) {
    if (!item) {
        alert("Campo Descrição Obrigatório")
        return false
    }
    if (item.length < 32 || item.length >= 512) {
        alert("Campo Descrição deve ter entre 32 e 512 caracteres")
        return false
    }
    return true
}

export function validaVideo(item) {
    if (!item) {
        return true
    }
    if (!(item.indexOf("https://www.youtube.com/") !== -1)) {
        alert("Campo video deve conter um link originário do youtube.com")
        return false
    }
    return true
}

export function msgSalvar() {
    alert("Dica Cadastrada com Sucesso na base de conhecimento!")
}

export function msgEditar() {
    alert(`As informações da dica selecionada para edição foram enviadas para a barra lateral. Realize as devidas edições e clique em Editar para finalizar`)
}