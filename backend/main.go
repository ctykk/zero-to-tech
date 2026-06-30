package main

import (
	"backend/apis"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var address = "127.0.0.1:8080"

func main() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	router.GET("/api/identity", apis.IdentityHandler)
	router.POST("/api/analysis", apis.AnalysisHandler)

	fmt.Printf("启动服务，监听 %s\n", address)
	if err := router.Run(address); err != nil && !errors.Is(err, http.ErrServerClosed) {
		_, _ = fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
