const knex = require('../DB/DB')
let express = require('express')
let router = express.Router();

const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const userDTO = require('../dtos/user-dto')

const {body, validationResult} = require('express-validator')
const ApiError = require("../exeptions/apiError");
const UserDto = require("../dtos/user-dto");
const tokenService = require('../services/token-services')
const transporter = nodemailer.createTransport({
    host: process.env.Service,
    auth: {
        user: process.env.usermail,
        pass: process.env.passwordmail,
    },
    port:465
});
router.get("/categories", async (req, res) => {
    const categories = await knex.withSchema("public").select("*").from("categories");

    const totalCount = categories.length;
    const rangeStart = req.headers['range-start'] || 0;
    const rangeEnd = req.headers['range-end'] || totalCount - 1;

    const slicedCategories = categories.slice(rangeStart, rangeEnd + 1);

    res.set('Content-Range', `categories ${rangeStart}-${rangeEnd}/${totalCount}`);
    res.send(slicedCategories);
});

router.get("/products", async (req, res) => {
    const { range, sort } = req.query;

    // Parse the range and sort parameters
    const [rangeStart, rangeEnd] = range ? JSON.parse(range) : [0, 9];
    const [sortField, sortDirection] = sort ? JSON.parse(sort) : ["id", "ASC"];

    // Retrieve the products from the database
    const products = await knex.withSchema("public").select("*").from("products");

    // Apply sorting
    products.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortDirection === "ASC" ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
            return sortDirection === "ASC" ? 1 : -1;
        }
        return 0;
    });

    // Slice the products based on the range
    const slicedProducts = products.slice(rangeStart, rangeEnd + 1);

    const totalCount = products.length;

    // Set the Content-Range header
    res.setHeader("Content-Range", `products ${rangeStart}-${rangeEnd}/${totalCount}`);

    // Send the sliced products as the response
    res.send(slicedProducts);
});
router.post("/products", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category_id,
            image_url,
            quantity_in_stock,
            attributes,
        } = req.body;

        // Convert the array of attributes to a JSON object
        const processedAttributes = attributes.reduce((result, { name_attribute, value }) => {
            result[name_attribute] = value;
            return result;
        }, {});

        const newProduct = await knex
            .withSchema("public")
            .insert({
                name,
                description,
                price,
                category_id,
                image_url,
                quantity_in_stock,
                attributes: processedAttributes,
            })
            .into("products")
            .returning("id");

        const createdProduct = {
            id: newProduct[0].id,
            ...req.body,
            attributes: processedAttributes,
        };

        res.status(201).json({ data: createdProduct });

    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

router.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        // Check if the product exists
        const existingProduct = await knex
            .withSchema("public")
            .select("*")
            .from("products")
            .where("id", productId)
            .first();

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete the product
        await knex.withSchema("public").from("products").where("id", productId).del();

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});
router.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category_id, image_url, quantity_in_stock, attributes } = req.body;

    try {
        // Check if the product exists
        const existingProduct = await knex
            .withSchema("public")
            .select("*")
            .from("products")
            .where("id", productId)
            .first();

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update the product
        await knex.withSchema("public")
            .from("products")
            .where("id", productId)
            .update({
                name,
                description,
                price,
                category_id,
                image_url,
                quantity_in_stock,
                attributes,
            });

        res.status(200).json({ message: "Product updated successfully" });

    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});
router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await knex.withSchema("public")
            .select("*")
            .from("products")
            .where({ id: productId })
            .first();

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Convert attributes object back to an array
        const attributes = Object.entries(product.attributes).map(([name_attribute, value]) => ({
            name_attribute,
            value
        }));

        // Update the product object with the attributes array
        const productWithAttributes = {
            ...product,
            attributes
        };

        res.json(productWithAttributes);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve product" });
    }
});



router.get("/customers", async (req, res) => {
    const { range, sort } = req.query;

    // Parse the range and sort parameters
    const [rangeStart, rangeEnd] = range ? JSON.parse(range) : [0, 9];
    const [sortField, sortDirection] = sort ? JSON.parse(sort) : ["id", "ASC"];

    // Retrieve the customers from the database
    const customers = await knex.withSchema("public").select("*").from("customers");

    // Apply sorting
    customers.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortDirection === "ASC" ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
            return sortDirection === "ASC" ? 1 : -1;
        }
        return 0;
    });

    // Slice the customers based on the range
    const slicedCustomers = customers.slice(rangeStart, rangeEnd + 1);

    const totalCount = customers.length;

    // Set the Content-Range header
    res.setHeader("Content-Range", `customers ${rangeStart}-${rangeEnd}/${totalCount}`);

    // Send the sliced customers as the response
    res.send(slicedCustomers);
});


router.get("/categories/:category_name/products", async (req, res) => {
    const { category_name } = req.params;
    const filtersStr = req.query.filters; // Получение строки фильтров из запроса

    let query = knex
        .withSchema("public")
        .select("*")
        .from("products")
        .innerJoin("categories", "products.category_id", "categories.id")
        .where("categories.category_name", category_name);

    // Преобразование строки фильтров в объект
    if (filtersStr) {
        const filtersObj = JSON.parse(decodeURIComponent(filtersStr));

        // Применение фильтров на столбец attributes
        Object.keys(filtersObj).forEach((key) => {
            const value = filtersObj[key];
            query = query.whereRaw(`attributes->>'${key}' = '${value}'`);
        });
    }

    const products = await query;

    res.send(products);
});


router.get("/products-top", async (req, res) => {
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
            throw ApiError.BadRequest(`Пользователь уже зарегистрирован`)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await knex('customers').insert({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            address: req.body.address,
            phone_number: req.body.phone_number,
            admin: false
        })
        const currentUser = await knex
            .select('email', 'id')
            .from('customers')
            .where('email', req.body.email)
        const userdto = new UserDto(currentUser[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)
        const activationToken = tokenService.generateTokenForEmail({ userId: userdto.id })
        const mailOptions = {
            from: process.env.usermail,
            to: userdto.email,
            subject: 'Account Activation',
            text: `To activate your account, click on the following link: ${process.env.BASE_URL}/api/activate/${activationToken.emailToken}`,
        };
        await transporter.sendMail(mailOptions);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
        res.send('Registration successful. Please check your email for activation instructions.')
    } catch (e) {
        next(e.message)
    }
})
router.get('/activate/:token', async (req, res, next) => {
    try {
        const { token } = req.params;

        // Verify the activation token
        const decodedToken = tokenService.validateRefreshToken(token)
        const userId = decodedToken.userId;

        // Update the activated status of the user
        await knex('customers')
            .update('activated',true)
            .where('id', userId );

        return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
        next(error);
    }
});
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
        next(e.message)
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
router.get('/attributes/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params;

        const products = await knex
            .select('products.attributes')
            .from('products')
            .innerJoin('categories', 'products.category_id', 'categories.id')
            .where('categories.category_name', categoryName);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the category' });
        }

        const attributes = {};

        products.forEach((product) => {
            const productAttributes = product.attributes;

            for (const key in productAttributes) {
                if (productAttributes.hasOwnProperty(key)) {
                    const value = productAttributes[key];

                    if (!attributes[key]) {
                        attributes[key] = [value];
                    } else if (!attributes[key].includes(value)) {
                        attributes[key].push(value);
                    }
                }
            }
        });

        res.json(attributes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;