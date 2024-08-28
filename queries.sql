CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

UPDATE items
SET title = 'Dahi'
WHERE id = 1;

INSERT INTO items (title) VALUES ('Ice-cream');
SELECT * FROM items;

DELETE FROM items WHERE id = 3;