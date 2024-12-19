# 视频号直接上传到COS

## 配置

配置好 .env

```
PORT=
COS_URL=
COS_SECRETID=
COS_SECRETKEY=
```

下载 cos.exe 或 cos (linux 环境)

配置好后直接运行

```
// windows.exe
./cos.exe

// linux
./cos
```

## 使用

直接调接口 POST 请求

```
{
    "url": "http://wxapp.tc.qq.com/251/20302/stodownload?encfilekey=Cvvj5Ix3eewK0tHtibORqcsqchXNh0Gf3sJcaYqC2rQDnMq0cTqVuBpnOQaSZKK4Eia5ztAibWcEm3WNrMP1SsE8Wb35wSzvyZJbP9AN2ibIzxdgexbr4UPnyKTUufQX6WsH&adaptivelytrans=0&bizid=1023&dotrans=0&hy=SH&idx=1&m=&token=cztXnd9GyrF7Dqkj8ibGVHvkKmj2iavnvEFWHAPF8xVqg5uicbkG7M4HbImU10DOeraDicQhmYzucp0hfgrBRHEnISiabOs6owX3zGgg9BSke45yby6X8aaM0xxqtia7ZpPQydNBichKW0C3Xq6OXW1jVwx7xut5pX4744he3n7eIH1uow&ctsc=1&extg=10f0000&svrbypass=AAuL%2FQsFAAABAAAAAAARANcP9kLhZf3UabhjZxAAAADnaHZTnGbFfAj9RgZXfw6V0sZxz2KvVSQ15bBSEU1iXEWn383hOu0z7KngdpGa%2Fh3GuhhUZMrdAc4%3D&svrnonce=1734588521",
    "objectId": "14076629058695203042",
    "decodeKey": 1290448874
}

// 返回

{
    "url": "https://test-1259654469.cos.ap-guangzhou.myqcloud.com/sph/14076629058695203042.mp4"
}
```

