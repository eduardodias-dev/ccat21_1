drop schema if exists ccca;

create schema ccca;

create table ccca.account (
    account_id uuid primary key,
    name text,
    email text,
    document text,
    password text
);

create table ccca.balance (
    account_id uuid,
    asset_id text,
    quantity int,

    foreign KEY (account_id) REFERENCES ccca.account(account_id)

);