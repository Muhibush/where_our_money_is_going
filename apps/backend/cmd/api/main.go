package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/muhibush/where_our_money_is_going/backend/internal/database"
	"github.com/muhibush/where_our_money_is_going/backend/internal/handlers"
)

func main() {
	// Initialize Database
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}
	database.InitDB(databaseURL)

	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // For development
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Public Routes
	r.Group(func(r chi.Router) {
		r.Post("/api/auth/register", handlers.Register)
		r.Post("/api/auth/login", handlers.Login)
	})

	// Protected Routes
	r.Group(func(r chi.Router) {
		r.Use(handlers.AuthMiddleware)
		r.Get("/api/transactions", handlers.ListTransactions)
		r.Post("/api/transactions", handlers.CreateTransaction)
		r.Delete("/api/transactions/{id}", handlers.DeleteTransaction)
	})

	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal(err)
	}
}
