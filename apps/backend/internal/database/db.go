package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB(dataSourceName string) {
	var err error
	DB, err = sql.Open("postgres", dataSourceName)
	if err != nil {
		log.Panic(err)
	}

	if err = DB.Ping(); err != nil {
		log.Panic(err)
	}

	createTables()
	log.Println("Database connected and tables verified.")
}

func createTables() {
	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
	);`

	transactionTable := `
	CREATE TABLE IF NOT EXISTS transactions (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id),
		amount NUMERIC(12,2) NOT NULL,
		type VARCHAR(50) NOT NULL,
		category VARCHAR(100) NOT NULL,
		date TIMESTAMPTZ NOT NULL,
		note TEXT,
		payment_method VARCHAR(100),
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
	);`

	if _, err := DB.Exec(userTable); err != nil {
		log.Panic(err)
	}
	if _, err := DB.Exec(transactionTable); err != nil {
		log.Panic(err)
	}
}
