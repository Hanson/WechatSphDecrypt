package main

type Config struct {
	Port string

	CosUrl       string
	CosSecretId  string
	CosSecretKey string
}

var Cfg *Config
