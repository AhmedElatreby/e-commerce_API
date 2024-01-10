// USER
// add user
// POST http://localhost:3000/users/register

// get all users
// GET http://localhost:3000/users

// Get user by ID
// GET http://localhost:3000/users/:userId

// update user
// PUT http://localhost:3000/users/:userId

// Delete
// DELETE  http://localhost:3000/users/:userId

// AUTH

// Login
// POST  http://localhost:3000/auth/login

// Logout
// GET  http://localhost:3000/auth/logout

// categories

// Retrieve all categories
//GET http://localhost:3000/categories/

// Retrieve a single category by ID
// GET http://localhost:3000/categories/:categoryId

// Create a new category
// POST http://localhost:3000/categories/

// Update a category by ID
// PUT http://localhost:3000/categories/:categoryId

// Delete a category by ID
// delete http://localhost:3000/categories/:categoryId

// products

// Retrieve all products or products by category
//GET http://localhost:3000/products/

// Retrieve a single product by ID
//GET http://localhost:3000/products/:productId

// Create a new product
// POST http://localhost:3000/products/

// Update a product by ID
// PUT http://localhost:3000/products/:productId

// Delete a product by ID
// delete http://localhost:3000/products/:productId

// Cart

// Create a new cart for the authenticated user
// POST http://localhost:3000/cart/create

// Add a product to the user's cart
// POST  http://localhost:3000/:cartId/addProduct
//  Test data {
//     "product_id": "3",
//     "quantity": 1
// }

// Get details of the user's cart
// GET http://localhost:3000/cart/:cartId

// Update the quantity of a product in the user's cart
// PUT http://localhost:3000/cart/:cartId/updateProduct
// Test data {
//     "product_id": 5,
//     "quantity": 10
// }

// Remove a product from the user's cart
//DELETE http://localhost:3000/cart/:cartId/removeProduct
// Test data {
//     "product_id": 5
// }


// Checkout route
//POST http://localhost:3000/cart/:cartId/checkout
// Test data {
//     "product_id": 5
// }

/*
To Test checkout process
1- create Cart 
    - Make sure user is login before creating cart
    - use POST http://localhost:3000/cart/create to create a cart

2- Add Products to the Cart
    - use POST  http://localhost:3000/:cartId/addProduct

    -  Test data {
         "product_id": "3",
         "quantity": 1
        }

3- View Cart Details:
    -  Get details of the user's cart
       GET http://localhost:3000/cart/:cartId
       it will show 
       [
    {
        "quantity": 3,
        "product_id": 6,
        "name": "pc",
        "price": "999.99",
        "description": "High-performance pc"
    },
    {
        "quantity": 9,
        "product_id": 1,
        "name": "tea",
        "price": "10.99",
        "description": "this is a test"
    }
]


4- Update Product Quantity in Cart
    - use PUT http://localhost:3000/cart/:cartId/
    - Test data {
                "product_id": 6,
                "quantity": 4
                }

5- Remove Product from Cart
    - Use DELETE http://localhost:3000/cart/:cartId/removeProduct
    - Test Data {
        "product_id": 1
        }

6- Checkout
    - POST http://localhost:3000/cart/:cartId/checkout
    - the output will be like this:
    {
    "message": "Checkout successful",
    "order": {
        "order_id": "252e5f19-c471-4e41-9b6a-9bbf962ef740",
        "status": "pending",
        "total_price": 0
    }
}
*/
