/*
 * Autor: Zambrano Valverde Luis 
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // configuración de la base de datos

// Función para manejar el login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET, // Tu clave secreta para JWT
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { loginUser };
