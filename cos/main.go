package main

import (
	"bytes"
	"fmt"
	"github.com/hanson/wechatSphDecrypt"
	"github.com/joho/godotenv"
	"github.com/tidwall/gjson"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	Cfg = &Config{}

	err := godotenv.Load()
	if err == nil {
		Cfg.Port = os.Getenv("PORT")

		Cfg.CosUrl = os.Getenv("COS_URL")
		Cfg.CosSecretId = os.Getenv("COS_SECRETID")
		Cfg.CosSecretKey = os.Getenv("COS_SECRETKEY")
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		b, err := io.ReadAll(r.Body)
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}

		decodeKey := gjson.GetBytes(b, "decodeKey").Uint()

		urlResp, err := http.Get(gjson.GetBytes(b, "url").String())
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}

		defer urlResp.Body.Close()

		b, err = io.ReadAll(urlResp.Body)
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}

		enclenStr := urlResp.Header.Get("X-enclen")
		encLen, err := strconv.ParseUint(enclenStr, 10, 32)
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}

		wechatSphDecrypt.DecryptData(b, uint32(encLen), decodeKey)

		putObject(gjson.GetBytes(b, "objectId").String(), bytes.NewReader(b))

		respJson := fmt.Sprintf(`{"url": "%s/sph/%s.mp4"}`, Cfg.CosUrl, gjson.GetBytes(b, "objectId").String())

		w.Write([]byte(respJson))
	})

	http.ListenAndServe(":"+Cfg.Port, nil)
}
