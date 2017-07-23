import express from 'express'
const PORT = 3000

const app = express()
app.set('json spaces', 2)

app.get('/', (req, res) => res.json({ status: 'NTask API' }))

app.get('/tasks', (req, res) => {
  res.json([
    { title: 'Fazer compras' },
    { title: 'Consertar PC' }
  ])
})

app.listen(PORT, console.log(`NTask API - Running on port ${PORT}...`))
