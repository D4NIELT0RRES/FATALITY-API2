/****************************************************************************************************
 * Objetivo: Desenvolver um pequeno software com estados,região, etc...
 * Data: 11/10/2024
 * Autor: Daniel
 * Versão: 1.0
 ****************************************************************************************************/

/*
    Para criar uma API devemos instalar:
    express        npm install express --save         --> Serve para criar uma API
    cors           npm install cors --save            --> Serve para configurar as permissões da API
    body-parser    npm install body-parser --save     --> Serve para manipular os dados do body da API
*/

var cursosEscola = require('./cursos')
var alunosEscola = require('./alunos')

//const { listaDeEstados } = require('../../Missão04-Back End/modulo/estados_cidades')


//Recupera uma lista de todos os cursos oferecidos pela escola.
const getListaDeCursos = function(){
    let cursos = {
        Curso: []
    }
    let curso = cursosEscola.cursos
    if(cursosEscola.cursos == ''){
        return false
    }else{
        curso.forEach(function(item){
            cursos.Curso.push(item.nome)
        })
    }
    return(cursos)
}
//Recupera uma lista de todos os alunos matriculados na escola. 
const getListaDeAlunos = function(){
    let alunos = {
        Alunos: []
    }
    let aluno = alunosEscola.alunos
    if(alunosEscola.alunos == ''){
        return false
    }else{
        aluno.forEach(function(item){
            alunos.Alunos.push(item.nome)
        })
    }
    return(alunos)
}
//Recupera informações de um aluno específico com base no número de matrícula. 
const getListaDoAlunoPelaMatricula = function(matricula){
    let entrada = String(matricula)
    let baseInicial = alunosEscola.alunos
    let alunosMatriculados = ''
    let status = false

    baseInicial.forEach(function(item){
        if(String(item.matricula) === entrada){
            status = true 
            alunosMatriculados = item
        }
    })

    if(alunosEscola.alunos == ''){
        return false
    }else{
        return alunosMatriculados
    }

}
//Recupera uma lista de todos os alunos matriculados no curso especificado DS ou REDES
const getListaDeAlunoPeloCurso = function(sigla){
    let entrada = String(sigla).toUpperCase()
    let baseInicial = alunosEscola.alunos
    let cursoDoAluno = {alunos:[]}
    let status = false

    baseInicial.forEach(function(item){
        item.curso.forEach(function(itemCurso){
            if(String(itemCurso.sigla).toUpperCase() === entrada){
                status = true
                cursoDoAluno.alunos.push(item)
            }
        })
    })

    if(status == false){
        return false
    }else{
        return cursoDoAluno
    }
}
//Recupera uma lista de todos os alunos com o status especificado. (Finalizado ou Cursando) 
const getListaDoAlunoPorStatus = function(status){
    let entrada = String(status).toUpperCase()
    let baseInicial = alunosEscola.alunos
    let statusDoAluno = {aluno:[]}
    let verificador = false

    baseInicial.forEach(function(item){
        if(String(item.status).toUpperCase() === entrada){
            verificador = true
            statusDoAluno.aluno.push(item)
        }
    })

    if(verificador == false){
        return false
    }else{
        return statusDoAluno
    }
}
// função que retorna lista de alunos matriculados em um curso especificado e com base em um status da disciplina Aprovado, Reprovado ou EXAME
const getListaCursoStatus = function(curso, statusDisciplina){
    let cursoDeEntrada = String(curso).toUpperCase()
    let statusDaEntrada = String(statusDisciplina).toUpperCase()
    let dadosAlunos = alunosEscola.alunos
    let filtro ={
        curso: cursoDeEntrada,
        status: statusDaEntrada,
        alunos: []
    }
    let status = false

    dadosAlunos.forEach(function(aluno){
        let alunoFiltrado = {
            nome: aluno.nome,
            matricula: aluno.matricula,
            sexo: aluno.sexo,
            foto: aluno.foto,
            cursos: []
        }
        let encontrouDisciplina = false

        aluno.curso.forEach(function(cursoAtual){
            if(String(cursoAtual.sigla).toUpperCase() === cursoDeEntrada){
                let filtrosDaDisciplina = []

                cursoAtual.disciplinas.forEach(function(disciplina) {
                    if(String(disciplina.status).toUpperCase() === statusDaEntrada
            ){
                        filtrosDaDisciplina.push({
                            nome: disciplina.nome,
                            carga: disciplina.carga,
                            media: disciplina.media,
                            status: disciplina.status
                        })
                        encontrouDisciplina = true
                    }
                })

                if(filtrosDaDisciplina.length > 0){
                    alunoFiltrado.cursos.push({
                        nome: cursoAtual.nome,
                        sigla: cursoAtual.sigla,
                        disciplinas: filtrosDaDisciplina
                    })
                }
            }
        })

        if(encontrouDisciplina){
            filtro.alunos.push(alunoFiltrado)
            status = true
        }
    })

    if(status){
        return filtro
    }else{
        return false
    }
}
//Recupera uma lista de alunos matriculados em um curso especificado e com base no ano de conclusão 
const getListaPelaDataDeConclusao = function(siglaDaDisciplina, dataDeConclusao){
    let curso1 = String(siglaDaDisciplina).toUpperCase()
    let anoConclusao = Number(dataDeConclusao)
    let baseInicial = alunosEscola.alunos
    let verificador = false
    let catalogoCompleto = {curso: curso1, data_de_conclusao: anoConclusao, alunos:[]}

    baseInicial.forEach(function(item){
        item.curso.forEach(function(itemDoCurso){
            if(String(itemDoCurso.sigla).toUpperCase() == curso1 && Number(itemDoCurso.conclusao) == anoConclusao){
                catalogoCompleto.alunos.push(item)
                verificador = true
            }
        })
    })
    if(verificador == false){
        return false
    }else{
        return catalogoCompleto
    }
}
//console.log(getListaDeCursos())
//console.log(getListaDeAlunos())
//console.log(getListaDoAlunoPelaMatricula('20151001002'))
//console.log(getListaDeAlunoPeloCurso('RDS'))
// console.log(getListaDoAlunoPorStatus('Cursando'))
//console.log(getListaCursoStatus('RDS','reprovado'))
//console.log(getListaPelaDataDeConclusao('DS','2024'))

module.exports = {
    getListaDeCursos,
    getListaDeAlunos,
    getListaDoAlunoPelaMatricula,
    getListaDeAlunoPeloCurso,
    getListaDoAlunoPorStatus,
    getListaCursoStatus,
    getListaPelaDataDeConclusao
}