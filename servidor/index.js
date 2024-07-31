const express =require('express')
const mysql = require('mysql')
const cors = require("cors");
const app = express();
const moment = require('moment');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "noruega"
});

app.post("/registrar" , (req,res) =>{
    const nombre = req.body.nombre;
    const nacimiento = req.body.nacimiento;
    const raza = req.body.raza;
    const foto = req.body.foto;
    const genero = req.body.genero;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    const madre = req.body.madre;
    const padre = req.body.padre;

    db.query('INSERT INTO bovinos (nombre, nacimiento, raza, foto, genero, peso, descripcion, madre, padre) VALUES (?,?,?,?,?,?,?,?,?)', [nombre, nacimiento, raza, foto, genero, peso, descripcion, madre, padre],
    (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
     );
});

app.get("/bovinos" , (req,res) =>{

    db.query('SELECT * FROM bovinos ', 
    (err,result) =>{
        if(err){
            console.log(err);
        }else{


            
            const formattedResults = result.map(evento => ({
                ...evento, nacimiento: moment(evento.nacimiento).format('YYYY-MM-DD')
            
            }))
              console.log(formattedResults)
              res.send(formattedResults);
        }
    }
     );
});


app.put("/actualizar" , (req,res) =>{
    const nombre = req.body.nombre;
    const nacimiento = req.body.nacimiento;
    const raza = req.body.raza;
    const foto = req.body.foto;
    const genero = req.body.genero;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    const madre = req.body.madre;
    const padre = req.body.padre;

    db.query('UPDATE bovinos SET nombre=?,nacimiento=?, raza=?,foto=?, genero=?,peso=?, descripcion=?, madre=?, padre=? WHERE id=?', [nombre,nacimiento,raza, foto, genero, peso, descripcion, madre, padre],
    (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
     );
});

app.delete("/eliminar/:id" , (req,res) =>{
    const id = req.params.id;

    db.query('DELETE FROM bovinos  WHERE id=? ',id,
    (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado eliminado con exito");
        }
    }
     );
});

app.listen(8081, () =>{
    console.log("Escuchando en el puerto 8081")
})