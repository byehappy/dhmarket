const knex = require('../DB/db.js');
const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }
    generateTokenForEmail(payload) {
        const emailToken = jwt.sign(payload, process.env.Secret_key_email,{expiresIn:'2h'})

        return {
            emailToken
        }
    }
    generateTokenForReset(payload) {
        const resetToken = jwt.sign(payload, process.env.Secret_key_reset,{expiresIn:'2h'})

        return {
            resetToken
        }
    }
    async saveToken(customerId, refreshToken) {
        const tokens = await knex
            .select('*')
            .from('customers')
            .joinRaw('left join customer_tokens as token ON token.customer_id = customers.id', [])
            .where('customer_id', customerId);

        await tokens.some(async function(currentObject) {
            if (currentObject.token !== 0 || currentObject.token !== undefined || currentObject.token !== '') {
                await knex
                    .select('*')
                    .from('customer_tokens')
                    .where('customer_id', customerId)
                    .update('token', refreshToken);
                return null;
            }
        });

        await knex('customer_tokens').insert({
            customer_id: customerId,
            token: refreshToken,
        });
    }


    validateToken(token) {
        try {
            const userData = jwt.verify(token, process.env.Secret_key_email)
            return userData
        } catch (e) {
            return null;
        }
    }
    validateTokenReset(token) {
        try {
            const userData = jwt.verify(token, process.env.Secret_key_reset)
            return userData
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH)
            return userData
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await knex
            .select('*')
            .from('customer_tokens')
            .where('token', refreshToken)
            .del()

        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await knex
            .select('token')
            .from('customer_tokens')
            .where('token', refreshToken)

        return tokenData
    }
}

module.exports = new TokenService()
