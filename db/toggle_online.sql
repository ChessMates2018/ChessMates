update users 
    set is_online = not is_online
    where username = $1