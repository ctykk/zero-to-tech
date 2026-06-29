package main

import (
	"errors"
	"fmt"
	"math"
	"math/rand/v2"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mozillazg/go-pinyin"
)

type AnalysisRequest struct {
	Text string `json:"text" binding:"required"`
}
type AnalysisResponse struct {
	OriginText   string   `json:"origin_text"`
	PinYin       []string `json:"pin_yin"`
	Emotion      string   `json:"emotion"`
	EmotionScore float64  `json:"emotion_score"`
}

var emotions = []string{"积极", "偏积极", "中性", "偏消极", "消极"}

var address = "127.0.0.1:8080"

func RoundFloat64(num float64, n ...int) float64 {
	if len(n) == 0 {
		return math.Round(num)
	}
	shift := math.Pow10(n[0])
	return math.Round(num*shift) / shift
}

func main() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.POST("/api/analysis", func(c *gin.Context) {
		// 验证请求体
		var request AnalysisRequest
		if err := c.BindJSON(&request); err != nil {
			return
		}
		text := strings.TrimSpace(request.Text)
		if text == "" || len(text) != len(request.Text) {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		// 计算拼音
		pinyinResult := make([]string, 0, len(text))
		for _, p := range pinyin.Pinyin(text, pinyin.Args{
			Style:    pinyin.Tone,
			Fallback: func(r rune, _ pinyin.Args) []string { return []string{string(r)} },
		}) {
			if len(p) >= 1 {
				pinyinResult = append(pinyinResult, p[0])
			}
		}

		c.JSON(http.StatusOK, AnalysisResponse{
			OriginText:   text,
			PinYin:       pinyinResult,
			Emotion:      emotions[rand.IntN(len(emotions))],
			EmotionScore: RoundFloat64(rand.Float64()*2-1, 4),
		})
	})

	fmt.Printf("启动服务，监听 %s\n", address)
	if err := router.Run(address); err != nil && !errors.Is(err, http.ErrServerClosed) {
		_, _ = fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
