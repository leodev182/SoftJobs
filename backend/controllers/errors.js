function errorHandler(e, req, res, next) {
  // console.error(e.stack);

  if (e.name === "JsonWebTokenError") {
    // Error de autenticación JWT
    return res.status(401).json({ error: "Token de autorización inválido" });
  } else {
    // Otros tipos de errores
    return res
      .status(e.code || 500)
      .json({ message: e.error || "Error interno del servidor" });
  }
}

module.exports = errorHandler;
