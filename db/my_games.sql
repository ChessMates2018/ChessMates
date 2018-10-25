select * from game_history
where loser = $1 or winner = $1;
-- order by date desc;
