// Llamado, asignación, e importacion de dependencias y demas para la aplicación

const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config();
app.disable('x-powered-by');
const { verifyToken } = require('./middlewares/jwt.js');
const { verifyUser } = require('./validation/zod.js');
const { verifyPartialUser } = require('./validation/zodLogin.js')
const { pool } = require('./databases/database.js');

const PORT = process.env.PORT ?? 1234;
app.use(express.json())
app.use(cors());

// Creació0n de rutas con Express
app.post('/register',async (req, res)=>{
    const userData = verifyUser(req.body);
    if(userData.error){
       return res.status(400).send(userData.error);
    }
    // AQUI HACEMOS UNA BUSQUEDA EN LA BD PARA MIRAR QUE EL USUARIO NO EXISTA CON EL NOMBRE 
    const firstQuery = `SELECT * FROM usuarios WHERE nombre = $1`;
    const firstValue = [userData.data.nombre];
    const firstRes = await pool.query(firstQuery, firstValue);
    if(firstRes.rows.length > 0){
        return res.status(401).json({message:'El usuario ya existe, intente con otro nombre'});
    }
    const passwordHashed = await bcrypt.hash(userData.data.password, 10);
    const query = `INSERT INTO Usuarios(nombre, email, password)
    VALUES($1, $2, $3)`;
    const values = [userData.data.nombre, userData.data.email, passwordHashed]
    const response = await pool.query(query,values)
    console.log(response.rows[0]);
    return res.status(201).json({message:'Usuario creado con éxito'});
})

app.post("/login", async (req,res)=>{
    const dataCheck = verifyPartialUser(req.body);
    if(!dataCheck.success){
        return res.status(400).json({message:"Usuario no encontrado"})
    }
    const dbPass = await pool.query("SELECT password FROM usuarios WHERE nombre = $1", [dataCheck.data.nombre]);
    if (dbPass.rowCount === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado en la base de datos' });
    }    
    const validateUser = await bcrypt.compare(dataCheck.data.password, dbPass.rows[0].password);
    if(validateUser){
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({user: dataCheck.data.nombre}, secret, {expiresIn: '1hr'} )
        return res.status(201).json({message: dataCheck.data.nombre, token})
    }else{
        res.status(400).json({message:'contraseña incorrecta'})
    }
        
    
})

// CONTROL DE MIDDLEWARE PARA JWT EN LAS RUTAS 


// Escucha de la aplicacion en el puerto establecido
app.listen(PORT, ()=>{
    console.log(`Server listen on port: http://localhost:${PORT}`)
})