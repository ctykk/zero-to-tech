package apis

import (
	"math/rand/v2"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	pinyin_ "github.com/mozillazg/go-pinyin"
)

type AnalysisRequest struct {
	Text string `json:"text" binding:"required"`
}
type Pinyin struct {
	Char   string  `json:"char"`
	Pinyin *string `json:"pinyin"`
}
type AnalysisResponse struct {
	Pinyin       []Pinyin `json:"pinyin"`
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
	pinyinArgs := pinyin_.Args{
		Style: pinyin_.Tone,
	}
	pinyin := make([]Pinyin, 0, len([]rune(text)))
	for _, r := range text {
		ps := pinyin_.SinglePinyin(r, pinyinArgs)
		p := Pinyin{Char: string(r)}
		if len(ps) > 0 {
			p.Pinyin = new(ps[0])
		}
		pinyin = append(pinyin, p)
	}

	// 计算情绪
	emotion, emotionScore := generateEmotion()

	// 随机延迟
	time.Sleep(time.Duration(rand.IntN(1000)) * time.Millisecond)

	c.JSON(http.StatusOK, AnalysisResponse{
		Pinyin:       pinyin,
		Emotion:      emotion,
		EmotionScore: emotionScore,
	})
	return
}
