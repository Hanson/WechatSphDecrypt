package wechatSphDecrypt

import (
	"io"
	"log"
	"net/http"
	"strconv"
)

func DownloadAndDecrypt(url string, decodeKey uint64) (b []byte, err error) {
	resp, err := http.Get(url)
	if err != nil {
		return
	}

	defer resp.Body.Close()

	b, err = io.ReadAll(resp.Body)
	if err != nil {
		return
	}

	enclenStr := resp.Header.Get("X-enclen")
	log.Println(enclenStr)

	encLen, err := strconv.ParseUint(enclenStr, 10, 32)
	if err != nil {
		log.Printf("err: %+v", err)
		return
	}

	DecryptData(b, uint32(encLen), decodeKey)

	return
}
