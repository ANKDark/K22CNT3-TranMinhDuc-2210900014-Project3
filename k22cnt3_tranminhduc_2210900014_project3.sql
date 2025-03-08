CREATE DATABASE k22cnt3_tranminhduc_2210900014_project3
use k22cnt3_tranminhduc_2210900014_project3;

CREATE TABLE tmd_users (
    tmd_id INT PRIMARY KEY AUTO_INCREMENT,
    tmd_name NVARCHAR(100) NOT NULL,
    tmd_email NVARCHAR(100) UNIQUE NOT NULL,
    tmd_password_hash NVARCHAR(255) NOT NULL,
    tmd_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tmd_categories (
    tmd_id INT PRIMARY KEY AUTO_INCREMENT,
    tmd_user_id INT NOT NULL,
    tmd_name VARCHAR(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    tmd_type TINYINT(1) NOT NULL,
    FOREIGN KEY (tmd_user_id) REFERENCES tmd_users(tmd_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tmd_transactions (
    tmd_id INT PRIMARY KEY AUTO_INCREMENT,
    tmd_user_id INT NOT NULL,
    tmd_category_id INT DEFAULT NULL,
    tmd_amount DECIMAL(10,2) NOT NULL,
    tmd_transaction_date DATE NOT NULL,
    tmd_note TEXT,
    FOREIGN KEY (tmd_user_id) REFERENCES tmd_users(tmd_id) ON DELETE CASCADE,
    FOREIGN KEY (tmd_category_id) REFERENCES tmd_categories(tmd_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tmd_budgets (
    tmd_id INT PRIMARY KEY AUTO_INCREMENT,
    tmd_user_id INT NOT NULL,
    tmd_category_id INT NOT NULL,
    tmd_amount_limit DECIMAL(10,2) NOT NULL,
    tmd_start_date DATE NOT NULL,
    tmd_end_date DATE NOT NULL,
    FOREIGN KEY (tmd_user_id) REFERENCES tmd_users(tmd_id) ON DELETE CASCADE,
    FOREIGN KEY (tmd_category_id) REFERENCES tmd_categories(tmd_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tmd_savings (
    tmd_id INT PRIMARY KEY AUTO_INCREMENT,
    tmd_user_id INT NOT NULL,
    tmd_goal_name VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    tmd_target_amount DECIMAL(10,2) NOT NULL,
    tmd_saved_amount DECIMAL(10,2) DEFAULT '0.00',
    tmd_target_date DATE NOT NULL,
    FOREIGN KEY (tmd_user_id) REFERENCES tmd_users(tmd_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
