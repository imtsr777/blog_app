create database blog_app;

create extension pgcrypto; 

create table users(
    userId serial primary key,
    firstname varchar(20) not null,
    lastname varchar(20) not null,
    phone varchar(15) not null,
    bestCategory varchar(30) not null,
    password varchar(200) not null,
    role varchar(15) not null,
    username varchar(20) not null unique
);

create table categories(
    categoryId serial not null primary key,
    categoryName varchar(50) not null,
    createdData timestamp not null default now()
);
insert into categories (categoryname) values('Patrons');
insert into categories (categoryname) values('News');
insert into categories (categoryname) values('Breaking News');
insert into categories (categoryname) values('Winter');
insert into categories (categoryname) values('Gaming');
insert into categories (categoryname) values('So good');


drop table categories;
drop table posts;

create table posts(
    postId serial primary key,
    userId int not null references users(userId),
    imageUrl varchar(200) not null,
    title varchar(200) not null,
    category int references categories(categoryId),
    createdData timestamp not null default now()
);

insert into posts(userId,imageUrl,title,category) values(
    1,'cacaacavveeeveveve','cnkancak cnkascnks ncksnkcs',2);

insert into posts(userId,imageUrl,title,category) values(
    2,'cacaacavveeeveveve','cnkancak cnkascnks ncksnkcs',4);

    
update categories set categoryName='sabzavot', createdData=now() where categoryid=3;