// Importamos las lbrerias y las guardamos en unas constantes.
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
// Servidor de express se le coloca el nombre de app
const app = express()
app.use(express.json())
app.use(cors()) //Nadamas entrar quien tenga aceso, por eso el cors se queda vacío, para que sea publico
// Iniciamos el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor creado en http://localhost: ${PORT}`)
})

// Conexion con mySQL
//! ALTER USER "root" @"localhost" IDENTIFIED WITH mysql_native_password by "danielyeray5"
//! CREATE DATABASE "topicos"

const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "danielyeray5",
    port: 3306,
    database: "topicos"
})

conection.connect((err) => {
    if (err) {
        console.error(err.message || "No se pudo conectar a la base de datos")
    } else {
        console.log('Conectado a la base de Datos')
    }
})

app.get("/", (req, res) => {
    conection.query("SELECT * FROM usuarios;", (e, result) => {
        if (e) {
            res.status(500).json('message: ', e.message || "No se pudo conectar a la base de datos")
        } else {
            res.status(200).json(result)
        }
    })
});

app.post('/', (req, res) => {
    const {Nombre} = req.body
    conection.query(`INSERT INTO usuarios VALUES (DEFAULT, "${Nombre}")`, (e, result) => {
        if (e) {
            res.status(500).json('message: ', e.message || "No se pudo conectar a la base de datos")
        } else {
            res.status(200).json(result)
        }
    })
})

app.patch('/', (req, res) => {
    const { ID, Nombre } = req.body
    conection.query(`UPDATE usuarios SET Nombre="${Nombre}" WHERE ID=${ID} ; `, (e, result) => {
        if (e) {
            res.status(500).json('message', e.message || "No se puede actualizar la base de datos")
        } else {
            res.status(200).json(result)
        }
    })
})

app.delete('/', (req, res) => {
    const { ID } = req.body
    conection.query(`DELETE FROM usuarios WHERE ID=${ID}`, (e, result) => {
        if (e) {
            res.status(500).json('message', e.message || "No se puede eliminar el usuario")
        } else {
            res.status(200).json(result)
        }
    })
})