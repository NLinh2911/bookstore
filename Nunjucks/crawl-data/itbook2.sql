-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-08-31 08:26:43.087

-- tables
-- Table: book
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS category CASCADE; 

CREATE TABLE book (
    id int  NOT NULL,
    title varchar(255)  NOT NULL,
    author text[],
    isbn_10 varchar(255),
    year varchar(255),
    language varchar(255),
    page varchar(255),
    file_size varchar(255),
    file_format varchar(255),
    top_category varchar(255),
    category text[],
    image varchar(255),
    description text,
    download_link varchar(255),
    read_link varchar(255),
    document tsvector,
    CONSTRAINT book_pk PRIMARY KEY (id)
);

CREATE TABLE category (
    id int  NOT NULL,
    name varchar(255)  NOT NULL,
    parent_id int,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

-- add index for document column
CREATE INDEX idx_fts_search ON book USING gin(document);
-- End of file.

