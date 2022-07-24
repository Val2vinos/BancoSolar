const express = require("express");
const app = express();
const { getUsuarios,getTransferencias,insertUsuario,updateUsuario,deleteUsuario,insertTransferencia } = require('./consultas')

app.listen(3000,console.log("servidor escuchando en puerto 3000"));
app.use(express.json())

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get('/usuarios', async (req,res) => {
    try {
        const { rows } = await getUsuarios()
        res.json(rows)
    } catch {
        res.status(500).send(error)
    }
})

app.post('/usuario',async (req,res) => {
    try {
        const result = await insertUsuario(req.body)
        res.json(result)    
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/usuario',async (req,res) => {
    try {
        const { id } = req.query
        const { name, balance } = req.body
        await updateUsuario([id,name,balance])
        res.send()    
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/usuario',async (req,res) => {
    try {
        const { id } = req.query
        await deleteUsuario(id)
        res.send()      
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/transferencias', async (req,res) => {
    try {
        const { rows } = await getTransferencias()
        res.json(rows)
    } catch (error) {
        console.log('rescata transferencia')
        res.status(500).send(error)
    }
})

app.post('/transferencia', async (req,res) => {
    try {
        const result = await insertTransferencia(req.body)
        res.send(result)
    } catch (error) {
        console.log("transferencia")
        res.status(500).send(error)
    }
})