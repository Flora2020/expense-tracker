# 家庭記帳本 (expense-tracker)

## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 10.15.0

#### 套件
- bcryptjs 2.4.3
- body-parser 1.19.0
- connect-flash 0.1.1
- dotenv 8.2.0
- express 4.17.1
- express-handlebars 5.2.0
- express-session 1.17.1
- handlebars 4.7.7
- method-override 3.0.0
- mongoose 5.11.14
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0

#### 資料庫
- MongoDB Community Server 4.2.12

## 安裝與執行 (installation and execution)
1. 選定一個資料夾，用來存放本專案。開啟終端機，移動至該資料夾，下載本專案
```
git clone https://github.com/Flora2020/expense-tracker.git
```
2. 移動至本專案資料夾
```
cd expense-tracker
```
3. 安裝套件
```
npm install
```
4. 啟動伺服器
```
node app.js
```
5. 若終端機出現下列字樣，代表伺服器成功啟動，並且與資料庫連線
```
express is listening on http://localhost:3000
mongodb connected!
```
6. 執行家庭記帳本：打開瀏覽器，於網址列輸入
```
http://localhost:3000
```
7. 建立種子資料
```
npm run seed
```

## 功能 (features)
- 註冊帳號
- 登入帳號
- 登出帳號
- 登入後，可以：
  - 瀏覽個人所有支出紀錄
  - 新增個人支出紀錄
  - 編輯個人支出紀錄
  - 刪除個人支出紀錄
  - 以分類或日期篩選支出紀錄

## 預覽圖 (preview image)
![This is a preview image.](https://github.com/Flora2020/images/blob/main/expense-tracker-login.jpg?raw=true "This is a preview image.")