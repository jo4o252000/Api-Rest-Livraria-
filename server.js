//const http = require("http") //modulo http nativo do node 
import app from './src/app.js'
const port = process.env.port || 3000 //vai identificar a porta do servidor ou rodar na 3000(boa pratica para produção)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
