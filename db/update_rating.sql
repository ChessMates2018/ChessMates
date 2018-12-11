update users
set rating = rating + $1, 
    wins = wins + $5
where username = $3;

update users
set rating = rating - $2, 
    losses = losses + $6
where username = $4;


