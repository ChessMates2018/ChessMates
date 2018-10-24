INSERT INTO users
(username, password, rating, email, first_name, last_name)
VALUES
($1, $2, $3, $4, $5, $6);

SELECT * FROM users
