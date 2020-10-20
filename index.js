const e = require('express')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body parser middleware
app.use(express.urlencoded({extended: false}))

app.use(express.static(__dirname+'/static'))

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    if(req.query.nameFilter){
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === req.query.nameFilter.toLowerCase())
    }
    res.render('index.ejs', {dinosaurs: dinoData})
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.post('/dinosaurs', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)
    dinosaurs.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

    res.redirect('/dinosaurs')
})

app.get('/prehistoriccreatures', (req, res)=>{
    let pCreats = fs.readFileSync('./prehistoric_creatures.json')
    let creatData = JSON.parse(pCreats)
    if(req.query.nameFilter){
        creatData = creatData.filter(creat => creat.name.toLowerCase() === req.query.nameFilter.toLowerCase())
    }
    res.render('creats.ejs', {pCreats: creatData})
})

app.use('/prehistoriccreatures', require('./controllers/creatures'))

app.post('/prehistoriccreatures', (req,res)=>{
    let pCreats = fs.readFileSync('./prehistoric_creatures.json')
    pCreats = JSON.parse(pCreats)
    pCreats.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(pCreats))

    res.redirect('/prehistoriccreatures')
})

app.listen(8000)