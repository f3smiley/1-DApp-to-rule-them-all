```sql
CREATE DATABASE IF NOT EXISTS DAppDB;

USE DAppDB;

CREATE TABLE IF NOT EXISTS TokenData (
    id INT AUTO_INCREMENT,
    tokenName VARCHAR(255) NOT NULL,
    tokenSymbol VARCHAR(255) NOT NULL,
    totalSupply BIGINT NOT NULL,
    lockable BOOLEAN DEFAULT FALSE,
    chainId INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS LockAndMintEvents (
    id INT AUTO_INCREMENT,
    userId INT NOT NULL,
    lockableTokenId INT NOT NULL,
    mintableTokenId INT NOT NULL,
    amountLocked BIGINT NOT NULL,
    amountMinted BIGINT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES UserData(id),
    FOREIGN KEY (lockableTokenId) REFERENCES TokenData(id),
    FOREIGN KEY (mintableTokenId) REFERENCES TokenData(id)
);

CREATE TABLE IF NOT EXISTS OracleData (
    id INT AUTO_INCREMENT,
    oracleAddress VARCHAR(255) NOT NULL,
    jobId VARCHAR(255) NOT NULL,
    chainId INT NOT NULL,
    PRIMARY KEY (id)
);
```