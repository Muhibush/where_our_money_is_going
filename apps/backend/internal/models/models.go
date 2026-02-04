package models

import "time"

type User struct {
	ID           int       `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"created_at"`
}

type Transaction struct {
	ID            int       `json:"id"`
	UserID        int       `json:"user_id"`
	Amount        float64   `json:"amount"`
	Type          string    `json:"type"`          // 'Expense' or 'Income'
	Category      string    `json:"category"`      // e.g., 'Groceries', 'Rent'
	Date          time.Time `json:"date"`
	Note          string    `json:"note"`
	PaymentMethod string    `json:"payment_method"` // 'Credit Card', 'Cash'
	CreatedAt     time.Time `json:"created_at"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
