update users
set rating = rating + $1
where username = $2;

update users
set rating = rating - $1
where username = $3;


