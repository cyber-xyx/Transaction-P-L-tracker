CREATE DATABASE authtodo;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE txn(
  txn_id SERIAL,
  user_id uuid,
  token VARCHAR(255),
  buy_date DATE,
  sell_date DATE,
  amount NUMERIC(20,10),
  PRIMARY KEY (txn_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('admin', 'admin@admin.com', 'Qwerty123@');
INSERT INTO txn (user_id, token, buy_date, sell_date, amount) VALUES ('b2306367-c0d1-4b7a-99a1-7cb945e1cef7', 'bitcoin', '01-01-2021', '01-01-2022', '5');