import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT!

app
  .listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
  .on('error', (err) => {
    console.error(err)
  })
