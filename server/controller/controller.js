const knex = require('../DB/DB')
let express = require('express')
let router = express.Router();

const bcrypt = require('bcrypt')

const userDTO = require('../dtos/user-dto')

const {body, validationResult} = require('express-validator')
const ApiError = require("../exeptions/apiError");
const UserDto = require("../dtos/user-dto");
const tokenService = require('../services/token-services')

router.get("/products", async (req, res) => {
    const products = await knex.withSchema("public")
        .select("*")
        .from("products")
    res.send(products)
})
router.get("/products/top", async (req, res) => {
    const productsBestSell = await knex.withSchema("public")
        .select("*")
        .from("products")
        .orderBy("rating", "desc")
        .orderBy("votes", "desc")
        .limit(4)
    res.send(productsBestSell)
})
router.post("/registration", body('email').isEmail(), body('password').isLength({
    min: 6, max: 36
}), async (req, res, next) => {
    const users = await knex
        .select('email')
        .from("customers")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const hasDuplicates = await users.some(function (currentObject) {
            return currentObject.email.toLowerCase() === req.body.email;

        })
        if (hasDuplicates) {
            throw ApiError.BadRequest(`Пользователь уже зарегестрирован`)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await knex('customers').insert({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            address: req.body.address,
            phone_number: req.body.phone_number
        })
        const currentUser = await knex
            .select('email', 'id')
            .from('customers')
            .where('email', req.body.email)
        const userdto = new UserDto(currentUser[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e) {
        next(e)
    }
})
router.post("/login", async (req, res, next) => {
    try {
        const user = await knex
            .select("*")
            .from("customers")
            .where("email", req.body.email)

        if (!user[0]){
            throw ApiError.BadRequest('Данный пользователь не найден!')
        }
        const PassCompare = await bcrypt.compare(req.body.password, user[0].password)
        if (!PassCompare) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userdto = new userDTO(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e){
        next(e)
    }
})
router.post('/logout', async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken');
        return res.send('Выход успешен')
    } catch (e) {
        next(e)
    }
})
router.get('/refresh', async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;

        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await knex
            .select('*')
            .from('customers')
            .where('id', userData.id)

        const userdto = new userDTO(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e) {
        next(e)
    }
})
module.exports = router;