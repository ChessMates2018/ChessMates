drop table if exists friends;
drop table if exists users;
drop table if exists game_history;


create table users (
  id serial primary key,
  username varchar (60) unique not null,
  password varchar (60) not null,
  rating integer,
  image text,
  email varchar (250),
  first_name varchar (60),
  last_name varchar (60), 
  is_friend boolean,
  is_online boolean,
  wins  integer,
  losses integer
);

create table game_history (
  id serial primary key,
  user_light text,
  user_dark text,
  winner  text,
  loser text,
  time_ctrl text,
  moves varchar[],
  game_date date
);

create table friends (
  id serial primary key,
  user_id integer references users(id),
  friend integer
);

create table moves(
  id serial primary key, 
  gameid serial references game_history(id), 
  color varchar(10), 
  piece varchar(10), 
  move text,
  moveOrder int
  )