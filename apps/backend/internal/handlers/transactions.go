package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/muhibush/where_our_money_is_going/backend/internal/database"
	"github.com/muhibush/where_our_money_is_going/backend/internal/models"
)

func ListTransactions(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(int)

	rows, err := database.DB.Query(`SELECT id, user_id, amount, type, category, date, note, payment_method, created_at FROM transactions WHERE user_id = $1 ORDER BY date DESC`, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var t models.Transaction
		if err := rows.Scan(&t.ID, &t.UserID, &t.Amount, &t.Type, &t.Category, &t.Date, &t.Note, &t.PaymentMethod, &t.CreatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		transactions = append(transactions, t)
	}

	json.NewEncoder(w).Encode(transactions)
}

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(int)

	var req models.Transaction
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Basic Validation
	if req.Amount <= 0 || req.Type == "" || req.Category == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if req.Date.IsZero() {
		req.Date = time.Now()
	}

	query := `INSERT INTO transactions (user_id, amount, type, category, date, note, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	var id int
	err := database.DB.QueryRow(query, userID, req.Amount, req.Type, req.Category, req.Date, req.Note, req.PaymentMethod).Scan(&id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	req.ID = id
	req.UserID = userID

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(req)
}

func DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(int)
	idStr := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idStr)

	query := `DELETE FROM transactions WHERE id = $1 AND user_id = $2`
	result, err := database.DB.Exec(query, id, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
}
