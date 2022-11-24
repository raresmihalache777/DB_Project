import express from "express";
import mysql from "mysql";
import bp from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";


const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const datalog = "";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'agentie_turism'
}) 

//respond with res when enter /
app.get("/",(req,res)=>{
    res.json("this is the backend!");
})

app.get("/clients", (req,res)=>{
    const q = "SELECT * FROM Clienti";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
})

app.get("/excursions", (req,res)=>{
    const q = "SELECT * FROM Excursii";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
})

app.get("/excursions/:id", (req,res)=>{
    const id = req.params.id;
    const q = "SELECT * FROM agentie_turism.excursii WHERE ID_Excursie = ?";
    //console.log("/nRaspuns:")
    db.query(q,id,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
    //console.log("Request pt datele intrari cu id " + id)
    
})

app.post("/clients", (req,res)=>{
    
    const q = 'INSERT INTO agentie_turism.clienti(CNP, Nume, Prenume, Sex, Adresa, Data_Nastere, Data_Inrolare) VALUES (?)';
    const values = [
        req.body.CNP, 
        req.body.Nume, 
        req.body.Prenume, 
        req.body.Sex, 
        req.body.Adresa,
        req.body.Data_Nastere, 
        req.body.Data_Inrolare
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/excursions", (req,res)=>{
    
    const q = 'INSERT INTO agentie_turism.excursii(ID_Locatie, ID_Hotel, ID_Firma_Transport, ID_Manager, Data_Plecare, Durata, Locuri, Pret) VALUES (?)';
    const values = [
        req.body.ID_Locatie, 
        req.body.ID_Hotel, 
        req.body.ID_Firma_Transport, 
        req.body.ID_Manager, 
        req.body.Data_Plecare,
        req.body.Durata, 
        req.body.Locuri,
        req.body.Pret
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put("/excursions/update/:id", (req,res)=>{
    const id = req.params.id
    const q = "UPDATE agentie_turism.excursii SET `ID_Locatie` =  ?, `ID_Hotel` =  ?, `ID_Firma_Transport` =  ?, `ID_Manager` =  ?, `Data_Plecare` =  ?, `Durata` =  ?, `Locuri` =  ?, `Pret` =  ? WHERE ID_Excursie = ?";
    const values = [
        req.body.ID_Locatie, 
        req.body.ID_Hotel, 
        req.body.ID_Firma_Transport, 
        req.body.ID_Manager, 
        req.body.Data_Plecare,
        req.body.Durata, 
        req.body.Locuri,
        req.body.Pret,
    ];
    db.query(q,[...values,id], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Informatiile despre excursie au fost schimbate cu succes!");
    })
})

app.delete("/excursions/delete/:id", (req,res)=>{
    const id = req.params.id
    const q = 'DELETE FROM agentie_turism.excursii WHERE ID_Excursie= ?'
    db.query(q,id, (err,data)=>{
        if(err) return res.json(err);
        return res.json("Excursia a fost stearsa din baza de date!");
    })
})

//REGISTER
app.post("/register",(req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');

    const q = 'INSERT INTO agentie_turism.users(Email, Pwd, Account_Type) VALUES (?)'
    const values = [
        req.body.user,
        req.body.pwd,
        req.body.accountType
    ]
    console.log(values);

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Contul a fost creat cu succes!");
    })
})

//LOGIN
app.get("/login", (req,res)=>{
    const email = req.query.user;
    console.log(req.query.user)
   
    //const pass = req.body.pwd;
    //console.log(req.params.pass)
    
    //const q = "SELECT * FROM agentie_turism.users WHERE Email = ? AND PWD = ?";
    const q = "SELECT * FROM agentie_turism.users WHERE Email = ?";
    /*
    const values = [
        email,
        pass
    ]
    
    db.query(q,[...values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
    */

    db.query(q,email,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
})

/*
//LOGIN - EMAIL EXIST WRONG PASS CHECK
app.get("/login_wrong_pass_check", (req,res)=>{
    const email = req.body.user;
    const pass = req.body.pwd;

    console.log(req)
    const q = "SELECT * FROM agentie_turism.users WHERE Email = ?";

    db.query(q,email,(err,data)=>{
        if(err) return res.json(err)
        if(data===[]) 
            res.body = 'No such email mate!'
        return res.body;
    });
})
*/

//server listen to localhost:5000
app.listen(5000, ()=> {
    console.log("Connected to backend!");
})