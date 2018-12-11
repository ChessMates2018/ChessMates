update users
set rating = rating + $1, 
    wins = wins + $4
where username = $2;

update users
set rating = rating - $1, 
    losses = losses + $5
where username = $3;


