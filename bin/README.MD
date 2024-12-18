# 直接使用

```
// 解密带有加密的URL，获取方式可参考 https://www.apifox.cn/apidoc/shared-71b9855b-693c-48fc-858b-cde2c5afe5a8/api-34744242
./sph.exe -url="http://wxapp.tc.qq.com/251/20302/stodownload?encfilekey=rjD5jyTuFrIpZ2ibE8T7YmwgiahniaXswqzHib3zvfib8jCxdNEviauH4pgSC4FY3GyckcpMU2soypH24pWicicJ5w56Lticx5NI1qmMyfXJo83Kbtu0iclmn41X3C8w&dotrans=0&hy=SH&idx=1&m=&uzid=2&token=cztXnd9GyrHyDUNS08mucVGFz8Br8Uvw6NMbT5TWgSls1TjUxVuSgNEicsW69da5zH8uqtM3oOLI4UsjY7lKfoqRErhPMt22OgW0Qq9WGPSVGiaWo2UicttRxDjywe3ibYID8voq5zcrib8dSwL3MJxjfkianSumoEPZgZDsXrALZlsRk&ctsc=1&extg=10f0000&svrbypass=AAuL%2FQsFAAABAAAAAAC6BOKO8F9AAKMpIZ5iZxAAAADnaHZTnGbFfAj9RgZXfw6VXlmFlX8CLUZmjD%2FLCjKIOSK58OiuNaYV5GNbksQpi3517Qdj35jEpCk%3D&svrnonce=1734516257" -decodeKey=1104569773 -savepath=g:\\tmp.mp4

// 解密本地视频文件
./sph.exe -path="g:\\response.mp4" -decodeKey=1104569773 -savepath=g:\\tmp1.mp4
```