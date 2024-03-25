const bcrypt = require("bcryptjs");
const { pool } = require("../database/connection");

class UserDb {
  constructor() {}

  async insertData({ email, password, rol, lenguage }) {
    const secretPassword = bcrypt.hashSync(password);
    const values = [email, secretPassword, rol, lenguage];
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
    //{---------------------------------------------------------ESTE BLOQUE NO LOGRO CAPTURAR EL ERROR
    // if (error.message.includes("usuarios_email_key")) {
    //     throw { code: 401, error: "El email ya está registrado" };
    //   }
    // return rowCount;
    //}
    try {
      await pool.query(consulta, values);
      return 1;
    } catch (error) {
      if (error.message.includes("usuarios_email_key")) {
        // Error de violación de restricción de "UNIQUE" del email
        throw { code: 401, error: "El email ya está registrado" };
      } else {
        throw { code: 500, error: "Error interno del servidor" };
      }
    }
  }

  async getData(email) {
    const consulta =
      "SELECT email, rol, lenguage FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(consulta, [email]);
    if (rows.length === 0) {
      throw { error: "Usuario no encontrado", code: 404 };
    }
    return rows;
  }

  async checkData({ email, password }) {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const {
      rows: [usuario],
    } = await pool.query(consulta, [email]);
    if (!usuario) {
      throw { error: "Usuario no encontrado", code: 404 };
    }
    const { password: encripted } = usuario;
    const passwordOk = bcrypt.compareSync(password, encripted);
    if (!passwordOk) {
      throw { error: "La contraseña no es correcta ", code: 404 };
    }
  }
}

module.exports = new UserDb();
