// import jwt from "jsonwebtoken";

// export const verifyJwt = (req, res, next) => {
//   const token = req.body.jwt;

//   if (!token) {
//     return res.status(401).json("No se proporcionó un token.");
//   }

//   try {
//     // Verificar el token y obtener el payload (en este caso, solo el id del usuario)
//     const decoded = jwt.verify(token, "jwtkey");

//     // Agregar el id del usuario al objeto req para que esté disponible en otros controladores
//     req.user = decoded;

//     // Continuar con el siguiente middleware o controlador
//     next();
//   } catch (err) {
//     return res.status(401).json("Token inválido.");
//   }
// };
