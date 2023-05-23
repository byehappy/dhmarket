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
const passport = require("passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
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
    const { id,name, description, price, category_id, image_url, quantity_in_stock, attributes } = req.body;

    try {
        // Check if the product exists
        const existingProduct = await knex
            .withSchema("public")
            .select("*")
            .from("products")
            .where("id", id)
            .first();

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        const processedAttributes = attributes.reduce((result, { name_attribute, value }) => {
            result[name_attribute] = value;
            return result;
        }, {});
        // Update the product
        await knex.withSchema("public")
            .from("products")
            .where("id", id)
            .update({
                name,
                description,
                price,
                category_id,
                image_url,
                quantity_in_stock,
                attributes:processedAttributes,
            });

        res.status(200).json({ message: "Product updated successfully" });

    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
        console.log(error)
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
router.get("/users/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await knex.select("*").from("customers").where("id", userId).first();

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});
router.put("/users/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { email, name, address, phone_number } = req.body;

        const updatedUser = await knex("customers")
            .where("id", userId)
            .update({ email, name, address, phone_number })
            .returning("*");

        if (!updatedUser) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});
router.post('/forgot-password', async (req, res, next) => {
    try {
        const { email } = req.body;

        // Проверка, что пользователь с таким email существует
        const user = await knex('customers').where({ email }).first();
        if (!user) {
            throw new Error('User not found');
        }

        // Генерация токена сброса пароля
        const resetToken = tokenService.generateTokenForReset({ userId: user.id });

        // Отправка ссылки на сброс пароля по электронной почте
        const mailOptions = {
            from: process.env.usermail,
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click on the following link: ${process.env.CLIENT_URL}/reset-password/${resetToken.resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.send('Password reset link has been sent to your email.');
    } catch (e) {
        next(e.message);
    }
});
router.post('/reset-password/:resetToken', async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;
        // Расшифровка токена сброса пароля
        const decodedToken = tokenService.validateTokenReset(resetToken)

        // Проверка, что токен является действительным
        if (!decodedToken.userId) {
            throw new Error('Invalid reset token');
        }

        // Генерация соли для хеширования пароля
        const salt = await bcrypt.genSalt(10);

        // Хеширование нового пароля с использованием соли
        const hashedPassword = await bcrypt.hash(password, salt);


        // Обновление пароля пользователя в базе данных
        await knex('customers')
            .where('id',decodedToken.userId )
            .update({ password: hashedPassword });

        return res.send('Password has been successfully reset.')
    } catch (error) {
        next(error);
    }
});
router.get("/categories/:category_name/products", async (req, res) => {
    const { category_name } = req.params;
    const filtersStr = req.query.filters; // Get filters string from the request

    try {
        // First query: Retrieve the category ID based on the category name
        const categoryId = await knex
            .select("id")
            .from("categories")
            .where("category_name", category_name)
            .first();

        if (!categoryId) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Second query: Fetch the products belonging to the category ID
        let query = knex
            .select("*")
            .from("products")
            .where("products.category_id", categoryId.id);

        // Apply filters on the 'attributes' column
        if (filtersStr) {
            const filtersObj = JSON.parse(decodeURIComponent(filtersStr));
            Object.keys(filtersObj).forEach((key) => {
                const value = filtersObj[key];
                query = query.whereRaw(`attributes->>'${key}' = '${value}'`);
            });
        }

        const products = await query;

        res.send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});


router.get('/product/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Получите данные товара из базы данных по его идентификатору
        const product = await knex('products').where('id', productId).first();

        if (!product) {
            throw new Error('Product not found');
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
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
        const decodedToken = tokenService.validateToken(token)
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
        const refreshToken = req.cookies.refreshToken;

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
passport.use(
    new VKontakteStrategy(
        {
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_SECRET_KEY,
            callbackURL: "http://localhost:3001/api/auth/vkontakte/callback", //где найти url на случаи успеха и неудачи
            scope: ["email"],
            profileFields: ['email'],
        },
        async function (accessToken, refreshToken, params, profile, done) {
            try {
                const user = await knex('customers').select('*').where('id', profile.id)

                if (!user[0]) {

                    const hashPassword = await bcrypt.hash('PawosrdKvUnFuer', 3)

                    await knex('customers').insert(
                        {
                            id: profile.id,
                            name: profile.username,
                            email: profile.emails[0].value,
                            password: hashPassword,
                            activated:true
                        }
                    )

                    const currentUser = await knex
                        .select('email', 'id')
                        .from('customers')
                        .where('id', profile.id)
                    const userdto = new userDTO(currentUser[0])
                    const tokens = tokenService.generateTokens({...userdto})
                    await tokenService.saveToken(userdto.id, tokens.refreshToken)
                }

                return done(null, profile);
            }
            catch (err) {
                console.log(err);
                return done(err)
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log("SERIALIZE", user);
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function (data, done) {
    console.log("DESERIALIZE", data);
    done(null, JSON.parse(data));
});

router.get(
    "/auth/vkontakte/callback",
    passport.authenticate("vkontakte", {
        successRedirect: "/api/vkuser", //направить после успеха
        failureRedirect: "http://localhost:3000", //направить после неудачи
    })
);

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));

router.get("/vkuser", async function (req, res) { //инфа о пользователе
    try {

        res.redirect(`http://localhost:3000/vk-login/${req.user.id}`)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }

});

router.get("/vk-auth/:id", async (req, res) => {
    try {
        const user = await knex('customers').select('*').where('id', req.params.id)

        if (!user[0]) {
            throw new Error()
        }

        const userdto = new userDTO(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/cart/:customer_id", async (req, res) => {
    const { customer_id } = req.params;

    try {
        const cartItems = await knex
            .select(
                "order_items.quantity_ordered",
                "order_items.price",
                "products.*"
            )
            .from("order_items")
            .join("products", "order_items.product_id", "products.id")
            .join("orders", "order_items.order_id", "orders.id")
            .where("orders.customer_id", customer_id)

        res.send(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.delete("/cart/:customer_id/:product_id", async (req, res) => {
    const { customer_id, product_id } = req.params;

    try {
        // Get the order_ids for the customer's cart orders
        const orderIds = await knex("orders")
            .select("id")
            .where("customer_id", customer_id)
            .pluck('id')

        // Delete the product from the order_items table
        await knex("order_items")
            .whereIn("order_id", orderIds)
            .where("product_id", product_id)
            .del();

        // Check if the customer has any remaining items in the cart
        const remainingItems = await knex("order_items")
            .whereIn("order_id", orderIds)
            .first();

        if (!remainingItems) {
            // Delete the order records if there are no remaining items in order_items
            await knex("orders")
                .whereIn("id", orderIds)
                .del();
        }

        res.send("Product removed from cart successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while removing the product from the cart.");
    }
});

router.post("/cart/:customer_id/:product_id", async (req, res) => {
    const { customer_id, product_id } = req.params;

    try {
        // Get the product price and quantity
        const product = await knex("products")
            .select("price")
            .where("id", product_id)
            .first();

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        const { price } = product;
        const quantity_ordered = 1;

        // Check if the customer already has a cart order
        const existingOrder = await knex("orders")
            .where("customer_id", customer_id)
            .where("status", "cart")
            .first();

        if (existingOrder) {
            // If the customer has a cart order, update the total_price and add the product to the order_items table
            const total_price = Number(existingOrder.total_price) + price * quantity_ordered;

            await knex("orders")
                .where("id", existingOrder.id)
                .update({ total_price });

            await knex("order_items").insert({
                order_id: existingOrder.id,
                product_id,
                quantity_ordered,
                price,
            });
        } else {
            // If the customer does not have a cart order, create a new order and add the product
            const total_price = price * quantity_ordered;

            const [order_id] = await knex("orders")
                .returning("id")
                .insert({
                    customer_id,
                    status: "cart",
                    date_ordered: knex.fn.now(),
                    total_price,
                });

            await knex("order_items").insert({
                order_id,
                product_id,
                quantity_ordered,
                price,
            });
        }

        res.send("Product added to cart successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while adding the product to the cart.");
    }
});

router.put("/cart/:customer_id/:product_id", async (req, res) => {
    const { customer_id, product_id } = req.params;
    const { quantity } = req.body;

    try {
        // Get the product price
        const product = await knex("products")
            .select("price")
            .where("id", product_id)
            .first();

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        const { price } = product;

        // Update the quantity and total_price in the order_items table
        await knex("order_items")
            .whereExists(function () {
                this.select("id")
                    .from("orders")
                    .whereRaw("orders.id = order_items.order_id")
                    .where("orders.customer_id", customer_id)
                    .where("orders.status", "cart");
            })
            .where("product_id", product_id)
            .update({
                quantity_ordered: quantity,
                price: knex.raw(`quantity_ordered * ${price}`),
            });

        // Recalculate the total_price in the orders table
        await knex("orders")
            .where("customer_id", customer_id)
            .where("status", "cart")
            .update({
                total_price: knex.raw(`(
          SELECT SUM(price)
          FROM order_items
          WHERE order_items.order_id = orders.id
        )`),
            });

        res.send("Quantity updated successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the quantity.");
    }
});

router.delete("/cart/:customer_id", async (req, res) => {
    const { customer_id } = req.params;

    try {
        // Delete all order items associated with the customer's cart
        await knex("order_items")
            .whereIn("order_id", function () {
                this.select("id")
                    .from("orders")
                    .where("customer_id", customer_id)
                    .where("status", "cart");
            })
            .del();

        // Delete the cart orders for the customer
        await knex("orders")
            .where("customer_id", customer_id)
            .where("status", "cart")
            .del();

        res.send("Cart cleared successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while clearing the cart.");
    }
});





module.exports = router;