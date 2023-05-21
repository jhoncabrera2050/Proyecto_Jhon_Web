const {Router} = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const User = require('../models/User')
const authenticateToken = require('../middleware/authenticateToken');
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Busca al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Compara la contraseña ingresada con el hash almacenado en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Si la contraseña coincide, genera un nuevo token JWT
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    res.status(200).json({ token });
});


router.get('/profile', authenticateToken, (req, res) => {
    // Accede al ID del usuario autenticado
    const userId = req.userId;
  
    // Aquí puedes realizar lógica específica para la ruta de perfil del usuario
    // por ejemplo, obtener los detalles del usuario desde la base de datos
    // y devolverlos como respuesta
    res.json({ userId });
});
router.get('/dashboard', authenticateToken, (req, res) => {
    // Accede al ID del usuario autenticado
    const userId = req.userId;
  
    // Aquí puedes realizar lógica específica para la ruta del panel de control
    // por ejemplo, obtener los datos del panel de control desde la base de datos
    // y devolverlos como respuesta
    res.json({ userId });
});
  

  
  



  

module.exports = router;