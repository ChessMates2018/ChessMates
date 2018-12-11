update users
set rating =  $1
where username = $3;

update users
set rating = $2 
where username = $4;


