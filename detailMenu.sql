-- Active: 1689688312838@@localhost@5432@tugas_be_api

CREATE TABLE recipe (id SERIAL PRIMARY KEY);

ALTER TABLE recipe
ADD COLUMN recipe_name VARCHAR,
ADD COLUMN recipe_desc VARCHAR;

ALTER TABLE recipe ADD COLUMN recipe_ingredients VARCHAR;
ALTER TABLE recipe ADD COLUMN recipe_image VARCHAR;


INSERT INTO
    recipe (
        recipe_name,
        recipe_desc,
        recipe_ingredients
    )
VALUES
-- recipe 1
(
    'Nasi Goreng (Fried Rice)',
    'A popular Indonesian dish made with stir-fried rice, typically mixed with vegetables, eggs, and a choice of meat or shrimp. It is seasoned with soy sauce and spices for a savory flavor.',
    'Cooked rice, Soy sauce, Garlic, Onion, Vegetables (such as carrots, peas, and bell peppers), Meat or shrimp'
),
-- recipe 2
(
'Chicken Tikka Masala',
' A classic Indian dish consisting of marinated chicken pieces cooked in a creamy tomato-based sauce. It is flavored with a blend of aromatic spices, such as cumin, coriander, and garam masala.',
'Chicken, Yogurt, Lemon juice, Tomato, Onion, Garlic, Ginger, Spices (such as cumin, coriander, turmeric, and garam masala), Cream'
),
-- recipe 3
(
'Spaghetti Carbonara',
'An Italian pasta dish made with spaghetti noodles tossed in a rich sauce composed of eggs, grated cheese (usually Parmesan or Pecorino Romano), crispy bacon or pancetta, and black pepper.',
'Spaghetti noodles, Bacon or pancetta, Eggs, Grated cheese (such as Parmesan or Pecorino Romano), Black pepper'
),
-- recipe 4
(
'Sushi',
'A Japanese delicacy that features bite-sized portions of vinegared rice, usually topped with raw or cooked seafood, vegetables, or other ingredients. It is often served with soy sauce, wasabi, and pickled ginger.',
'Sushi rice, Vinegar, Sugar, Salt, Nori (seaweed), Raw or cooked seafood (such as salmon, tuna, shrimp), Vegetables (such as cucumber, avocado, carrot)'
),
-- recipe 5
(
'Pad Thai',
'A popular Thai stir-fried noodle dish made with rice noodles, eggs, tofu, shrimp or chicken, bean sprouts, and chopped peanuts. It is typically flavored with tamarind paste, fish sauce, lime juice, and chili flakes.',
'Rice noodles, Garlic, Tofu, Shrimp or chicken (optional), Tamarind paste, Fish sauce, Sugar, Chili flakes, Bean sprouts, Green onions'
),
-- recipe 6
(
'Beef Bourguignon',
'A classic French stew made with tender beef chunks braised in red wine, along with onions, carrots, mushrooms, and aromatic herbs. It is slow-cooked to perfection, resulting in a rich and flavorful dish.',
'Beef chunks, Onions, Carrots, Mushrooms, Red wine, Beef broth, Garlic, Herbs (such as thyme, bay leaves)'
),
-- recipe 7
(
'Tacos',
'A Mexican dish consisting of folded tortillas filled with various ingredients. Common fillings include seasoned ground beef or chicken, lettuce, tomatoes, cheese, salsa, and sour cream.',
'Tortillas, Ground beef or chicken, Lettuce, Tomatoes, Cheese, Salsa, Sour cream'
),
-- recipe 8
(
'Moussaka',
'A traditional Greek casserole dish made with layers of sautéed eggplant, ground meat (often lamb), and sliced potatoes. It is topped with a creamy béchamel sauce and baked until golden and bubbly.',
'Eggplant, Salt, Ground meat (often lamb), Onions, Garlic, Potatoes, Béchamel sauce'
),
-- recipe 9
(
'Kimchi Fried Rice',
'A Korean dish made with leftover rice stir-fried with kimchi, a spicy fermented cabbage, along with vegetables, meat, and often topped with a fried egg. It is a flavorful and satisfying dish.',
'Cooked rice, Garlic, Kimchi, Soy sauce, Vegetables (such as carrots, peas), Meat (such as chicken, beef, or shrimp), Fried egg (optional)'
),
-- recipe 10
(
'Paella',
'A Spanish rice dish cooked with a variety of ingredients, such as saffron-infused rice, chicken, chorizo, shrimp, mussels, and a medley of vegetables. It is cooked in a wide, shallow pan to develop a crispy bottom layer called "socarrat."',
'Rice, Onions, Garlic, Bell peppers, Saffron, Chicken, Chorizo, Shrimp, Mussels, Vegetables (such as peas, tomatoes, artichokes)'
);

UPDATE recipe SET recipe_image = 'gambar_1' WHERE id = 1;
UPDATE recipe SET recipe_image = 'gambar_2' WHERE id = 2;
UPDATE recipe SET recipe_image = 'gambar_3' WHERE id = 3;
UPDATE recipe SET recipe_image = 'gambar_4' WHERE id = 4;
UPDATE recipe SET recipe_image = 'gambar_5' WHERE id = 5;
UPDATE recipe SET recipe_image = 'gambar_6' WHERE id = 6;
UPDATE recipe SET recipe_image = 'gambar_7' WHERE id = 7;
UPDATE recipe SET recipe_image = 'gambar_8' WHERE id = 8;
UPDATE recipe SET recipe_image = 'gambar_9' WHERE id = 9;
UPDATE recipe SET recipe_image = 'gambar_10' WHERE id = 10;

ALTER TABLE recipe ALTER COLUMN recipe_image SET NOT NULL;

CREATE TABLE
    food_category (
        id SERIAL PRIMARY KEY,
        category VARCHAR(16)
    );


INSERT INTO
    food_category (category)
VALUES ('Main Course'), ('Side Dish'), ('Soup'), ('Salad'), ('Appetizer'), ('Dessert'), ('Snack'), ('Breakfast'), ('Beverage'), ('Baked Goods');

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR,
        phone_number VARCHAR,
        password VARCHAR
    );

INSERT INTO
    users (
        name,
        email,
        phone_number,
        password
    )
VALUES
-- User 1:
(
    'John Smith',
    'john.smith@example.com',
    '+1 123-456-7890',
    'abc123'
),
-- User 2:
(
'Emily Johnson',
'emily.johnson@example.com',
'+1 987-654-3210',
'qwerty123'
),
-- User 3:
(
'David Brown',
'david.brown@example.com',
'+1 555-123-4567',
'password123'
),
-- User 4:
(
'Sarah Davis',
'sarah.davis@example.com',
'+1 222-333-4444',
'12345678'
),
-- User 5:
(
'Michael Wilson',
'michael.wilson@example.com',
'+1 777-888-9999',
'mypass123'
),
-- User 6:
(
'Jessica Lee',
'jessica.lee@example.com',
'+1 444-555-6666',
'hello123'
),
-- User 7:
(
'Robert Taylor',
'robert.taylor@example.com',
'+1 999-888-7777',
'pass1234'
),
-- User 8:
(
'Olivia Martinez',
'olivia.martinez@example.com',
'+1 666-555-4444',
'987654321'
),
-- User 9:
(
'Daniel Johnson',
'daniel.johnson@example.com',
'+1 123-987-4567',
'abcdef123'
),
-- User 10:
(
'Sophia Anderson',
'sophia.anderson@example.com',
'+1 456-789-1234',
'mypassword456'
);

ALTER TABLE users ADD COLUMN photo VARCHAR;
UPDATE users SET photo = 'photo_1' WHERE id = 1;
UPDATE users SET photo = 'photo_2' WHERE id = 2;
UPDATE users SET photo = 'photo_3' WHERE id = 3;
UPDATE users SET photo = 'photo_4' WHERE id = 4;
UPDATE users SET photo = 'photo_5' WHERE id = 5;
UPDATE users SET photo = 'photo_6' WHERE id = 6;
UPDATE users SET photo = 'photo_7' WHERE id = 7;
UPDATE users SET photo = 'photo_8' WHERE id = 8;
UPDATE users SET photo = 'photo_9' WHERE id = 9;
UPDATE users SET photo = 'photo_10' WHERE id = 10;

ALTER TABLE users ALTER COLUMN photo SET NOT NULL;

ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

INSERT INTO users (name, email, phone_number, password, photo) VALUES ('admin', 'admin@admin.com', '082112345678', '123456', 'photo_admin');

ALTER TABLE recipe
ADD COLUMN category_id INT,
ADD COLUMN users_id INT;

UPDATE recipe SET category_id = 1, users_id = 1 WHERE id = 1;
UPDATE recipe SET category_id = 1, users_id = 3 WHERE id = 2;
UPDATE recipe SET category_id = 1, users_id = 4 WHERE id = 3;
UPDATE recipe SET category_id = 5, users_id = 7 WHERE id = 4;
UPDATE recipe SET category_id = 5, users_id = 2 WHERE id = 5;
UPDATE recipe SET category_id = 1, users_id = 9 WHERE id = 6;
UPDATE recipe SET category_id = 5, users_id = 1 WHERE id = 7;
UPDATE recipe SET category_id = 1, users_id = 10 WHERE id = 8;
UPDATE recipe SET category_id = 2, users_id = 10 WHERE id = 9;
UPDATE recipe SET category_id = 1, users_id = 6 WHERE id = 10;


ALTER TABLE recipe
ADD FOREIGN KEY (category_id) REFERENCES food_category(id);

ALTER TABLE recipe ADD FOREIGN KEY (users_id) REFERENCES users(id);

SELECT
    recipe.id,
    recipe.recipe_name,
    recipe.recipe_desc,
    recipe.recipe_ingredients,
    food_category.category,
    users.name AS writer,
    users.email,
    users.phone_number,
    users.password
FROM recipe
    JOIN food_category ON recipe.category_id = food_category.id
    JOIN users ON recipe.users_id = users.id;

SELECT
    recipe.id,
    recipe.recipe_name,
    recipe.recipe_desc,
    recipe.recipe_ingredients,
    food_category.*,
    users.name AS writer,
    users.email,
    users.phone_number,
    users.password
FROM recipe
    JOIN food_category ON recipe.category_id = food_category.id
    JOIN users ON recipe.users_id = users.id
WHERE id = ${id};

SELECT
    recipe.id,
    recipe.recipe_name,
    recipe.recipe_desc,
    recipe.recipe_ingredients,
    food_category.category,
    users.name AS writer,
    users.email,
    users.phone_number,
    users.password
FROM recipe
    JOIN food_category ON recipe.category_id = food_category.id
    JOIN users ON recipe.users_id = users.id;

SELECT
    recipe.id,
    recipe.recipe_name,
    recipe.recipe_desc,
    recipe.recipe_ingredients,
    food_category.category
FROM recipe
    JOIN food_category ON recipe.category_id = food_category.id
WHERE
    recipe.recipe_name ILIKE '%ayam%';

SELECT
    recipe.id,
    recipe.recipe_name,
    recipe.recipe_desc,
    recipe.recipe_ingredients,
    food_category.category
FROM recipe
    JOIN food_category ON recipe.category_id = food_category.id
WHERE
    recipe.recipe_name ILIKE '%goreng%'
ORDER BY recipe.id ASC
OFFSET 0
LIMIT 3;

ALTER TABLE recipe
ALTER COLUMN id
SET NOT NULL,
ALTER COLUMN recipe_name
SET NOT NULL,
ALTER COLUMN recipe_desc
SET NOT NULL,
ALTER COLUMN
recipe_ingredients
SET NOT NULL,
ALTER COLUMN category_id
SET NOT NULL,
ALTER COLUMN users_id
SET NOT NULL;

ALTER TABLE food_category
ALTER COLUMN id
SET NOT NULL,
ALTER COLUMN category
SET NOT NULL;

ALTER TABLE users
ALTER COLUMN id
SET NOT NULL,
ALTER COLUMN name
SET NOT NULL,
ALTER COLUMN email
SET NOT NULL,
ALTER COLUMN phone_number
SET NOT NULL,
ALTER COLUMN password
SET NOT NULL;