-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-08-31 07:17:01.274

DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS author_book CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS book_category CASCADE;
-- tables
-- Table: author
CREATE TABLE author (
    id int  NOT NULL,
    full_name varchar(50)  NOT NULL,
    CONSTRAINT author_pk PRIMARY KEY (id)
);

-- Table: author_book
CREATE TABLE author_book (
    book_id int  NOT NULL,
    author_id int  NOT NULL
);

-- Table: book
CREATE TABLE book (
    id int  NOT NULL,
    title varchar(255)  NOT NULL,
    isbn_10 varchar(50),
    languages varchar(255),
    year int,
    pages int,
    description text,
    file_size decimal(5,2),
    file_format varchar(50),
    download_link text,
    read_link text,
    CONSTRAINT book_pk PRIMARY KEY (id)
);

-- Table: book_category
CREATE TABLE book_category (
    category_id int  NOT NULL,
    book_id int  NOT NULL
);

-- Table: category
CREATE TABLE category (
    id int  NOT NULL,
    name varchar(255)  NOT NULL,
    parent_id int,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: author_book_author (table: author_book)
ALTER TABLE author_book ADD CONSTRAINT author_book_author
    FOREIGN KEY (author_id)
    REFERENCES author (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: author_book_book (table: author_book)
ALTER TABLE author_book ADD CONSTRAINT author_book_book
    FOREIGN KEY (book_id)
    REFERENCES book (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: book_category_book (table: book_category)
ALTER TABLE book_category ADD CONSTRAINT book_category_book
    FOREIGN KEY (book_id)
    REFERENCES book (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: book_category_category (table: book_category)
ALTER TABLE book_category ADD CONSTRAINT book_category_category
    FOREIGN KEY (category_id)
    REFERENCES category (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

