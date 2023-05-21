const {Router} = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken');
router.get('/',(req,res)=>{
    res.send('Hola mundo')
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Genera un hash de la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      email,
      password: hashedPassword, // Guarda el hash de la contraseña en lugar de la contraseña en texto plano
    });
  
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
  });
  

module.exports = router;