```sql
CREATE DATABASE IF NOT EXISTS DAppDB;

USE DAppDB;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    ethereum_address VARCHAR(42) NOT NULL UNIQUE,
    lockable_token_balance DECIMAL(18,8) DEFAULT 0.0,
    mintable_token_balance DECIMAL(18,8) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```