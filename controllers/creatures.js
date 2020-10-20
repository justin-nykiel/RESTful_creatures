const express = require('express')
const router = express.Router()

router.get('/new', (req,res)=>{
    res.render('pCreats/newCreat.ejs')
})




module.exports = router