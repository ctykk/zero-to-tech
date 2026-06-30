package apis

import (
	"math/rand/v2"
	"net/http"
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

var emotions = []string{"消极", "偏消极", "中性", "偏积极", "积极"}

func generateEmotion() (emotion string, emotionScore float64) {
	// emotionScore ∈ [-1, 1]
	emotionScore = rand.Float64()*2 - 1
	if emotionScore < -0.6 {
		emotion = emotions[0]
	} else if emotionScore < -0.2 {
		emotion = emotions[1]
	} else if emotionScore < 0.2 {
		emotion = emotions[2]
	} else if emotionScore < 0.6 {
		emotion = emotions[3]
	} else {
		emotion = emotions[4]
	}
	return
}

func AnalysisHandler(c *gin.Context) {
	// 验证请求体
	var request AnalysisRequest
	if err := c.BindJSON(&request); err != nil {
		return
	}
	text := strings.TrimSpace(request.Text)
	if text == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// 计算拼音
	pinyinArgs := pinyin.Args{Style: pinyin.Tone}
	pinyinResult := make([]string, 0, len(text))
	for _, p := range pinyin.Pinyin(text, pinyinArgs) {
		if len(p) >= 1 {
			pinyinResult = append(pinyinResult, p[0])
		}
	}

	// 计算情绪
	emotion, emotionScore := generateEmotion()

	c.JSON(http.StatusOK, AnalysisResponse{
		OriginText:   text,
		PinYin:       pinyinResult,
		Emotion:      emotion,
		EmotionScore: emotionScore,
	})
	return
}
