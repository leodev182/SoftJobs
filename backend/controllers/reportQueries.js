const reportQuery = (req, res, next) => {
  console.log(
    `Tipo de peticion: ${req.method} Ruta: ${req.protocol}://${req.hostname}${req.originalUrl}`
  );
  next();
};

module.exports = reportQuery;
