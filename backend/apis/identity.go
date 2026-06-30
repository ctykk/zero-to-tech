package apis

import (
	"math/rand/v2"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IdentityResponse struct {
	Motto string `json:"motto"`
}

var mottos = []string{
	"已识乾坤大，尤怜草木青。",
	"不积跬步，无以至千里。",
	"学而不思则罔，思而不学则殆。",
	"纸上得来终觉浅，绝知此事要躬行。",
	"路漫漫其修远兮，吾将上下而求索。",
	"博观而约取，厚积而薄发。",
	"知不足者好学，耻下问者自满。",
	"学然后知不足，教然后知困。",
	"业精于勤，荒于嬉；行成于思，毁于随。",
	"志之所趋，无远弗届；穷山距海，不能限也。",
}

func IdentityHandler(c *gin.Context) {
	c.JSON(http.StatusOK, IdentityResponse{mottos[rand.IntN(len(mottos))]})
	return
}
