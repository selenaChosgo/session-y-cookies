const fs = require("fs");
const path = require("path");
const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf8")
);
const writeUsers = (data) => fs.writeFileSync(
    path.join(__dirname, "../data/users.json"), JSON.stringify(data), "utf8"
);
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
    index: (req, res) => {
        res.render("form");
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            req.session.usuario = {...req.body};

        
            if(req.body.recordar){
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('cookie', req.session.usuario.color, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                }); 
            }

            res.render('form', {
                session: req.session
            })
        }else{
            console.log(errors.mapped());
                res.render('form', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    confirm: (req, res) => {
        res.render('confirm', {
            
            session: req.session
        })
    },
    olvidar: (req, res) => {
        req.session.destroy();

        if (req.cookies.cookie){
            res.cookie("cookie", "", {maxAge: -1});
        }

        res.redirect("/");
    }
}