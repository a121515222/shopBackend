Backend Package Dependency Badges

![Express Version](https://img.shields.io/badge/express-v4.16.4-000000)
![TypeScript Version](https://img.shields.io/badge/typescript-v5.6.2-3178C6)
![Mongoose Version](https://img.shields.io/badge/mongoose-v8.8.1-880000)
![Passport Version](https://img.shields.io/badge/passport-v0.7.0-34E27A)
![Firebase Admin Version](https://img.shields.io/badge/firebase--admin-v13.0.1-FFA611)
![JWT Version](https://img.shields.io/badge/jsonwebtoken-v9.0.2-000000)
![Swagger UI Version](https://img.shields.io/badge/swagger--ui--express-v5.0.1-85EA2D)
![NodeMailer Version](https://img.shields.io/badge/nodemailer-v6.9.16-07B6D5)
![Multer Version](https://img.shields.io/badge/multer-v1.4.5--lts.1-FF9001)
![Sharp Version](https://img.shields.io/badge/sharp-v0.33.5-99CC00)
![Bcrypt Version](https://img.shields.io/badge/bcrypt-v5.1.1-023047)
![Cors Version](https://img.shields.io/badge/cors-v2.8.5-2C3E50)

# 自種自售

「自種自售」是一個為自家農場產品設計的電商網頁專案，目前僅用於展示，尚未實作實際交易功能。本專案採用 Node.js 與 Express 框架，並結合 MongoDB 作為資料庫，實現前後端分離架構，展示截至 2025 年 2 月所學習的後端技術。

## 功能

- **用戶管理**：支援註冊、登入、忘記密碼、Google OAuth 登入等功能。
- **商品管理**：提供商品的 CRUD 操作，並支援分頁、搜尋和篩選。
- **文章管理**：用戶可新增、編輯和刪除文章，並支援搜尋功能。
- **購物車與訂單**：支援購物車管理、優惠券使用、訂單生成與管理。
- **評論系統**：買家可對訂單進行評論，賣家可查看評論。
- **後台管理**：管理員可管理商品、訂單、優惠券和用戶資料。
- **API 文檔**：使用 Swagger 自動生成 API 文檔，方便測試與調試。

## 專案安裝

```bash
pnpm install
```

## 專案啟動

```bash
pnpm dve
```

## swagger

```bash
pnpm swagger
```

### 本地端的 swaggerUI

後端專案啟動時
[本地端的 swaggerUI](http://localhost:8086/api-doc/)

## 後端 gitHub

[自種自售-後端](https://github.com/a121515222/shopBackend)

## 前端 gitHub

[自種自售-前端](https://github.com/a121515222/nuxt3Shope)
