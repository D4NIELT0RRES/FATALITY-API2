//Import das bibliotecas para criar umam API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')


//Inicializando o express através do objeto app
const app = express()


//request  -> Dados que chegam na API
//response ->Dados que saem da API
app.use((request, response, next)=>{
    //Permissão de acesso para liberar quais computadores poderão acessar a API
    response.header('Access-Control-Allow-Origin', '*')
    //Permissão de acesso para liberar os verbos da requisição da API
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())//Ativando as configurações dp cors

    next()//Sem o next é impossível concluir a API
})

//Import do arquivo de funções
const dadosDaEscola = require('./modulo/funcoes.js')
const { stat } = require('fs')
const { log } = require('console')

app.get('/v1/lion-school/cursos', cors(), async function(request, response){
    //Chama a função que vai retornar a lista dos estados
    let informacoesDaEscola = dadosDaEscola.getListaDeCursos()

    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request,response){

    let informacoesDaEscola = dadosDaEscola.getListaDeAlunos()

    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){

    let siglaDoCurso = request.query.siglaCurso
    let statusCurso = request.query.statusDaDisciplina
    let anoDeConclusao = request.query.anoDeConclusao
    let status = request.query.status

        if(status){
            let listaStatus = dadosDaEscola.getListaDoAlunoPorStatus(status)
            if(listaStatus){
                response.status(200)
                response.json(listaStatus)
            }else{
                response.status(404)
                response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
            }
            
        }else if(siglaDoCurso && statusCurso && !anoDeConclusao){
            let listaCursoPeloStatus = dadosDaEscola.getListaCursoStatus(siglaDoCurso, statusCurso)

            if(listaCursoPeloStatus){
                response.status(200)
                response.json(listaCursoPeloStatus)
            }else{
                response.status(404)
                response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
            }
        }else if(anoDeConclusao && siglaDoCurso && !statusCurso){
            let listaCurso = dadosDaEscola.getListaPelaDataDeConclusao(siglaDoCurso,anoDeConclusao)

            if(listaCurso){
                response.status(200)
                response.json(listaCurso)
            }else{
                response.status(404)
                response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
            }
        }
    
    


    
    

})

 
app.get('/v1/lion-school/alunos/matricula', cors(), async function(request, response){

    let codigo = request.query.matricula
    let informacoesDaEscola = dadosDaEscola.getListaDoAlunoPelaMatricula(codigo)

    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/lion-school/alunos/cursos/sgl',  cors(), async function(request, response){

    let sigla = request.query.sgl 
    let informacoesDaEscola = dadosDaEscola.getListaDeAlunoPeloCurso(sigla)

   
    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})


app.get('/v1/lion-school/alunos/curso&status', cors(), async function(request, response){

    let siglaDoCurso = request.query.curso
    let statusCurso = request.query.status
    let informacoesDaEscola = dadosDaEscola.getListaCursoStatus(siglaDoCurso,statusCurso)

    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/lion-school/alunos/curso&anoconclusao', cors(), async function(request, response){

    let siglaDoCurso = request.query.curso
    let anoDeConclusao = request.query.anoDeConclusao
    let informacoesDaEscola = dadosDaEscola.getListaPelaDataDeConclusao(siglaDoCurso, anoDeConclusao)

    if(informacoesDaEscola){
        response.status(200)
        response.json(informacoesDaEscola)
    }else{
        response.status(404)
        response.json({'Status': 404, 'message':' não foi possível encontrar nenhum item de retorno.'})
    }
})

app.listen('8080', function(){
    console.log('API aguardando requisições ...')
})
