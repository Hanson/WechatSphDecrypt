package main

import (
	"flag"
	"github.com/hanson/wechatSphDecrypt"
	"log"
	"os"
)

func main() {
	url := flag.String("url", "", "")
	path := flag.String("path", "", "")
	savepath := flag.String("savepath", "", "")
	decodeKey := flag.Uint64("decodeKey", 0, "")
	encLen := flag.Uint64("encLen", 131072, "")

	flag.Parse()

	var err error
	var b, decrypted []byte

	if *path != "" {
		b, err = os.ReadFile(*path)
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}
		wechatSphDecrypt.DecryptData(b, uint32(*encLen), *decodeKey)

		decrypted = b
	} else if *url != "" {
		decrypted, err = wechatSphDecrypt.DownloadAndDecrypt(*url, *decodeKey)
		if err != nil {
			log.Printf("err: %+v", err)
			return
		}
	}

	err = os.WriteFile(*savepath, decrypted, 0644)
	if err != nil {
		log.Printf("err: %+v", err)
		return
	}
}
