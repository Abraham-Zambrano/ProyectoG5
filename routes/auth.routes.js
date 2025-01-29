/*
 * Autor: Zambrano Valverde Luis 
 */
const express = require('express');

const createAuthRouter = (db) => {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Intentando iniciar sesión con email:', email);

    try {
      // Consulta SQL para verificar el usuario
      const query = 'SELECT id, email FROM usuarios WHERE email = ? AND password = ?';
      console.log('Ejecutando consulta:', query);

      const [results] = await db.query(query, [email, password]);
      if (results.length > 0) {
        const user = results[0];
        // Suponiendo que tienes un método para generar tokens JWT
        const token = generateToken(user);
        res.json({ token, user });
      } else {
        res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

  // Función para generar tokens JWT
  function generateToken(user) {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    return token;
  }

  return router;
};

module.exports = createAuthRouter;
