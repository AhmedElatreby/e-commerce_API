psql - U postgres - d ecomm_db CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255)
);
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);
CREATE TABLE Product_Categories (
    product_id INTEGER REFERENCES Products(product_id),
    category_id INTEGER REFERENCES Categories(category_id),
    PRIMARY KEY (product_id, category_id)
);
CREATE TABLE Carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Cart_Items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES Carts(cart_id),
    product_id INTEGER REFERENCES Products(product_id),
    quantity INTEGER
);
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10, 2)
);
CREATE TABLE Order_Items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(order_id),
    product_id INTEGER REFERENCES Products(product_id),
    quantity INTEGER,
    price DECIMAL(10, 2)
);
-- Alter the foreign key constraint to ON DELETE CASCADE
ALTER TABLE product_categories DROP CONSTRAINT product_categories_product_id_fkey,
    ADD CONSTRAINT product_categories_product_id_fkey FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE;
-- Alter table Products and adding image column
ALTER TABLE Products
ADD COLUMN image BYTEA;
-- create a table imag  
CREATE TABLE img (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    img TEXT
);
-- Insert image into table  
INSERT INTO products (name, price, description, image)
VALUES (
        'Product with Image',
        19.99,
        'Description of the product with an image',
        pg_read_binary_file(
            'D:\\web dev\\e-commerce2\\frontend\\src\\Components\\Assets\\p1_product.png'
        )::bytea
    );
--  Create a new_collection table 
CREATE TABLE new_collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image BYTEA,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255)
);

-- update tabel and insert an image 


UPDATE products
SET image = pg_read_binary_file('D:\\web dev\\e-commerce2\\frontend\\src\\Components\\Assets\\product_25.png')::bytea
WHERE product_id = 23;
# Exit psql
\ q