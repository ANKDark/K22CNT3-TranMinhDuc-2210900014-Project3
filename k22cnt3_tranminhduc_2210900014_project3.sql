CREATE DATABASE k22cnt3_tranminhduc_2210900014_project3
use k22cnt3_tranminhduc_2210900014_project3;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    type ENUM('income', 'expense') NOT NULL, -- Loại thu nhập hoặc chi tiêu
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NULL, -- Cho phép NULL để sử dụng ON DELETE SET NULL
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATE NOT NULL,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE budgets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount_limit DECIMAL(10,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE savings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    goal_name NVARCHAR(255) NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    saved_amount DECIMAL(10,2) DEFAULT 0,
    target_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
