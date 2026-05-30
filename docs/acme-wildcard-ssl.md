# acme.sh 通配符 HTTPS 证书自动续期配置

本文记录 `wkylin.cn` 使用 `acme.sh` + 阿里云 DNS API 申请 Let’s Encrypt 通配符证书，并配置 Nginx 自动续期的完整步骤。

适用目标：

- 主域名：`wkylin.cn`
- 通配符二级域名：`*.wkylin.cn`
- 证书类型：Let’s Encrypt DNS-01 通配符证书
- DNS 服务商：阿里云 DNS
- Web 服务：Nginx
- 服务器用户：`root`

## 1. 背景说明

一开始使用 `certbot --webroot` 申请普通证书时，只能覆盖明确写入的域名，例如：

```bash
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d wkylin.cn \
  -d www.wkylin.cn
```

这种方式不能自动覆盖 `visual.wkylin.cn`、`games.wkylin.cn`、`hacker.wkylin.cn`、`api.wkylin.cn`、`lotdb.wkylin.cn` 等二级域名。

如果逐个二级域名使用 Webroot 验证，则每个二级域名对应的 Nginx `server` 都需要正确放行：

```nginx
location ^~ /.well-known/acme-challenge/ {
    root /var/www/letsencrypt;
    default_type "text/plain";
    try_files $uri =404;
}
```

长期维护更省心的方式是申请通配符证书：

```text
wkylin.cn
*.wkylin.cn
```

通配符证书必须使用 DNS-01 验证，不能使用普通 HTTP Webroot 验证。

## 2. 安装 acme.sh

执行安装脚本：

```bash
curl https://get.acme.sh | sh
```

加载 shell 环境：

```bash
source ~/.bashrc
```

如果 `acme.sh` 命令未生效，可以使用完整路径：

```bash
~/.acme.sh/acme.sh --version
```

## 3. 切换默认 CA 为 Let’s Encrypt

`acme.sh` 新版本默认 CA 可能是 ZeroSSL。ZeroSSL 会要求先注册 EAB 账号，输出类似：

```text
No EAB credentials found for ZeroSSL
Please update your account with an email address first.
```

为了流程简单，切换默认 CA 到 Let’s Encrypt：

```bash
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

后续申请证书时会使用：

```text
https://acme-v02.api.letsencrypt.org/directory
```

## 4. 创建阿里云 RAM AccessKey

进入阿里云控制台：

```text
阿里云控制台 -> RAM 访问控制 -> 用户 -> 创建用户
```

建议创建一个专用 RAM 用户，例如：

```text
用户名：acme-dns
访问方式：OpenAPI 调用访问
```

创建后保存：

```text
AccessKey ID
AccessKey Secret
```

给该 RAM 用户授权：

```text
AliyunDNSFullAccess
```

说明：

- 这是为了允许 `acme.sh` 自动添加和删除 `_acme-challenge.wkylin.cn` TXT 记录。
- 更严格的做法是自定义只允许管理指定域名解析记录的权限策略。
- 不要把 AccessKey 写入代码仓库或 Nginx 配置。

## 5. 在服务器配置阿里云 DNS 环境变量

在服务器当前 shell 中执行：

```bash
export Ali_Key="你的AccessKeyId"
export Ali_Secret="你的AccessKeySecret"
```

检查是否设置成功：

```bash
echo $Ali_Key
echo $Ali_Secret
```

注意：

- 第一次成功申请后，`acme.sh` 会把凭证保存到自己的配置中。
- 后续自动续期时不需要手动重新 `export`。

## 6. 申请通配符证书

执行：

```bash
~/.acme.sh/acme.sh --issue --dns dns_ali \
  -d wkylin.cn \
  -d "*.wkylin.cn"
```

成功时会看到类似输出：

```text
Your cert is in: /root/.acme.sh/wkylin.cn_ecc/wkylin.cn.cer
Your cert key is in: /root/.acme.sh/wkylin.cn_ecc/wkylin.cn.key
The intermediate CA cert is in: /root/.acme.sh/wkylin.cn_ecc/ca.cer
And the full-chain cert is in: /root/.acme.sh/wkylin.cn_ecc/fullchain.cer
```

如果添加 TXT 记录失败，常见错误原因：

- `Ali_Key` 或 `Ali_Secret` 没有导出到当前 shell。
- AccessKey 写错。
- RAM 用户没有 `AliyunDNSFullAccess` 权限。
- 域名 `wkylin.cn` 不在该阿里云账号下。
- `_acme-challenge.wkylin.cn` 存在冲突 TXT 记录。

可以带 debug 重试：

```bash
~/.acme.sh/acme.sh --issue --dns dns_ali \
  -d wkylin.cn \
  -d "*.wkylin.cn" \
  --debug 2
```

## 7. 安装证书到 Nginx 固定目录

不要直接让 Nginx 读取 `/root/.acme.sh/...` 下的证书文件，推荐安装到固定路径。

创建目录：

```bash
sudo mkdir -p /etc/nginx/ssl/wkylin.cn
```

因为本次生成的是 ECC 证书，目录名是 `wkylin.cn_ecc`，安装时需要加 `--ecc`：

```bash
~/.acme.sh/acme.sh --install-cert -d wkylin.cn --ecc \
  --key-file /etc/nginx/ssl/wkylin.cn/privkey.pem \
  --fullchain-file /etc/nginx/ssl/wkylin.cn/fullchain.pem \
  --reloadcmd "systemctl reload nginx"
```

参数说明：

- `--install-cert`：把证书复制到指定路径，并记录安装配置。
- `-d wkylin.cn`：指定证书主域名。
- `--ecc`：使用 ECC 证书目录。
- `--key-file`：私钥目标路径。
- `--fullchain-file`：完整证书链目标路径。
- `--reloadcmd`：续期成功后自动重载 Nginx。

## 8. 修改 Nginx HTTPS 配置

所有 `wkylin.cn` 和二级域名的 `443` server 都可以使用同一组通配符证书：

```nginx
ssl_certificate /etc/nginx/ssl/wkylin.cn/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/wkylin.cn/privkey.pem;
```

示例：

```nginx
server {
    listen 443 ssl;
    server_name visual.wkylin.cn;

    ssl_certificate /etc/nginx/ssl/wkylin.cn/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/wkylin.cn/privkey.pem;

    location / {
        root /var/www/visual;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

主域名和其他二级域名也使用同样证书路径。

如果原来使用的是 Certbot 证书路径：

```nginx
ssl_certificate /etc/letsencrypt/live/wkylin.cn/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/wkylin.cn/privkey.pem;
```

需要替换成：

```nginx
ssl_certificate /etc/nginx/ssl/wkylin.cn/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/wkylin.cn/privkey.pem;
```

## 9. 检查并重载 Nginx

检查配置：

```bash
sudo nginx -t
```

重载 Nginx：

```bash
sudo systemctl reload nginx
```

## 10. 验证证书是否生效

用 `curl` 验证各域名 HTTPS 是否能访问：

```bash
curl -I https://wkylin.cn
curl -I https://www.wkylin.cn
curl -I https://visual.wkylin.cn
curl -I https://games.wkylin.cn
curl -I https://hacker.wkylin.cn
curl -I https://api.wkylin.cn
curl -I https://lotdb.wkylin.cn
```

查看某个二级域名当前返回的证书信息：

```bash
echo | openssl s_client -connect visual.wkylin.cn:443 -servername visual.wkylin.cn 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

正常情况下，Chrome 不应再出现：

```text
NET::ERR_CERT_COMMON_NAME_INVALID
```

## 11. 检查自动续期任务

查看 `acme.sh` 是否写入 cron：

```bash
crontab -l
```

应该能看到类似：

```bash
acme.sh --cron --home /root/.acme.sh
```

手动执行一次 cron 检查：

```bash
~/.acme.sh/acme.sh --cron --home ~/.acme.sh
```

如果证书还没到续期窗口，会看到类似：

```text
===Starting cron===
Renewing: 'wkylin.cn'
Renewing using Le_API=https://acme-v02.api.letsencrypt.org/directory
ARI suggestedWindow starts at: 2026-07-28T17:58:51Z
Skipping. Next renewal time is: 2026-07-29T21:39:45Z
Add '--force' to force renewal.
Skipped wkylin.cn_ecc
===End cron===
```

这表示自动续期任务正常，只是当前还没到续期时间。

## 12. 强制续期测试

如果确实需要强制续期测试，可以执行：

```bash
~/.acme.sh/acme.sh --renew -d wkylin.cn --ecc --force
```

注意：

- 不要频繁强制续期，Let’s Encrypt 有频率限制。
- 常规情况下只需要依赖 cron 自动续期。

## 13. 常见问题

### 13.1 ZeroSSL 提示没有 EAB credentials

现象：

```text
No EAB credentials found for ZeroSSL
Please update your account with an email address first.
```

处理：

```bash
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

### 13.2 Error adding TXT record to domain

现象：

```text
Error adding TXT record to domain: _acme-challenge.wkylin.cn
```

排查：

```bash
echo $Ali_Key
echo $Ali_Secret
```

然后确认 RAM 用户权限包含：

```text
AliyunDNSFullAccess
```

带 debug 重试：

```bash
~/.acme.sh/acme.sh --issue --dns dns_ali \
  -d wkylin.cn \
  -d "*.wkylin.cn" \
  --debug 2
```

### 13.3 二级域名仍然提示证书不匹配

现象：

```text
NET::ERR_CERT_COMMON_NAME_INVALID
```

原因通常是该二级域名的 Nginx `443` server 仍在使用旧证书。

检查 Nginx 生效配置：

```bash
sudo nginx -T | grep -n -A20 -B10 "server_name .*visual.wkylin.cn"
```

确认该 server 内使用的是：

```nginx
ssl_certificate /etc/nginx/ssl/wkylin.cn/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/wkylin.cn/privkey.pem;
```

然后：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 13.4 已有 Certbot 证书如何处理

之前通过 Certbot 申请的证书路径可能是：

```text
/etc/letsencrypt/live/wkylin.cn/fullchain.pem
/etc/letsencrypt/live/wkylin.cn/privkey.pem
```

如果 Nginx 已经统一改用 `acme.sh` 通配符证书：

```text
/etc/nginx/ssl/wkylin.cn/fullchain.pem
/etc/nginx/ssl/wkylin.cn/privkey.pem
```

则 Certbot 证书可以先保留不动。确认所有域名都稳定后，再考虑清理 Certbot 的自动续期任务和旧证书。
