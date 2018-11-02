INSERT INTO users
(username, password, rating, image, email, first_name, last_name, is_friend, is_online, wins, losses)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);

SELECT username, rating, email, first_name, last_name, image, wins, losses FROM users
where username = $1
