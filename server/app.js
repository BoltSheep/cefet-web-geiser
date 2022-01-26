// importação de dependência(s)


// variáveis globais deste módulo
const PORT = 3000
const db = {}
const fs = require('fs')

var express = require('express'),
    app = express();

const getFile = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'))



// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))




// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas

app.set('view engine','hbs')
app.set('views', 'server/views')


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)



app.get('/', function (req, res) {
    const data = getFile('server/data/jogadores.json')
    res.render('index', data)
})

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código

app.get('/jogador/:id/', function(req, res){
    const players = getFile('server/data/jogadores.json')
    const games = getFile('server/data/jogosPorJogador.json')[req.params.id]

    const player = players.players.find((j) => req.params.id === j.steamid)

    games.not_played_count = games.games.filter((g) => !g.playtime_forever).length || 0

    games.played_the_most = games.games.reduce((acc, r) => acc.playtime_forever > r.playtime_forever ? acc : r)

    games.top_five_games = games.games.sort((a, b) => a.playtime_forever > b.playtime_forever ? -1 : 1).slice(0,5)

    res.render('jogador', {player, games})

})




// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código

app.use(express.static("./client"))

app.listen(PORT)
// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
