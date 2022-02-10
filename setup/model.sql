create database blog_app;

create extension pgcrypto; 

create table users(
    userId serial primary key,
    firstname varchar(20) not null,
    lastname varchar(20) not null,
    phone varchar(15) not null,
    bestCategory varchar(30) not null,
    password varchar(200) not null,
    role varchar(15) not null
);

