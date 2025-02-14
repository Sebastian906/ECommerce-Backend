import userModel from "../models/userModel.js"

// agregar productos al carrito //
const addToCart = async (req,res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Agregado al carrito" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// actualizar productos del carrito //
const updateCart = async (req,res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Carrito actualizado" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// listar productos del carrito //
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }