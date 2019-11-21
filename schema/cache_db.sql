

create table citizen (
    handle varchar(64) not null primary KEY,
    name varchar(128) not null,
    bio varchar(1024) not null,
    enlisted varchar(32) not null,
    portrait varchar(128) not null,
    org varchar(32) not null,
    orgRank varchar(64) not null,
    website varchar(128) not null
)

create table news (
    id int not null auto_increment primary key,
    manufacturer varchar(64) not null,
    link varchar(128) not null
)