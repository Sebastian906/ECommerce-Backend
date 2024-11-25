import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Ruta para el inicio de sesión
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "Usuario no encontrado"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Contraseña incorrecta"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

// Ruta para el registro
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        //verificar que los datos no estén vacios
        if (!email || !name || !password) {
            return res.json({success: false, message: "Todos los campos son obligatorios"});
        }
        // revisar si el usuario ya existe
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "El usuario ya existe"});
        }
        // validación del formato de correo y contraseña
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Por favor ingrese un correo válido"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "La contraseña debe tener al menos 8 caracteres"});
        }
        // contraseña de usuario hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

// Ruta para el inicio de sesión del Administrador
const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin }