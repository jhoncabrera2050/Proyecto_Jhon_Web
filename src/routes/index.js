const {Router} = require('express');
const router = Router();
const User = require('../models/User')

router.get('/',(req,res)=>{
    res.send('Hola mundo')
});

router.post('/register', (req, res) => {
    // Lógica de autenticación
    res.send('hola soy un registro')
});

module.exports = router;