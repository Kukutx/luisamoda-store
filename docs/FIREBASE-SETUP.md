# Firebase 配置说明

本站使用 Firebase 的 **Authentication**、**Firestore**、**Storage**。按下面步骤在 Firebase 控制台创建项目并拿到配置，填到本地的 `.env.local` 即可。

---

## 一、您需要提供的环境变量（填在 `.env.local`）

在项目根目录复制 `.env.local.example` 为 `.env.local`，然后填入从 Firebase 控制台拿到的值：

| 变量名 | 说明 | 从哪里复制 |
|--------|------|------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Web API Key | Firebase 控制台 → 项目设置 → 常规 → 您的应用 → API 密钥 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | 认证域名 | 同上，形如 `项目ID.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | 项目 ID | 同上 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage 桶 | 同上，形如 `项目ID.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 发送方 ID | 同上（数字） |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 应用 ID | 同上，形如 `1:xxx:web:xxx` |

**示例（请全部替换成您自己的值）：**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

这些变量都是「公开」的（用于前端连接 Firebase），**不要**把服务端私钥或 Service Account JSON 放到前端或提交到 Git。`.env.local` 已在 `.gitignore` 中，不会被打包提交。

---

## 二、在 Firebase 控制台需要做的设置

### 1. 创建项目

1. 打开 [Firebase 控制台](https://console.firebase.google.com/)
2. 点击「添加项目」→ 输入项目名称（如 Luisa Moda）→ 按需开启/关闭 Analytics → 创建完成。

### 2. 注册 Web 应用（拿上面 6 个值）

1. 在项目概览页点击「</>」图标（Web 应用）。
2. 填写应用昵称，可选「Firebase Hosting」。
3. 注册后会出现一段 `firebaseConfig`，里面的 6 个字段对应上面 6 个环境变量，复制到 `.env.local` 即可。
4. 若已创建过 Web 应用：**项目设置（齿轮）→ 常规 → 您的应用** 里可看到同一份配置。

### 3. 启用 Authentication（登录/注册）

1. 左侧 **Authentication** → **Sign-in method**。
2. 启用 **电子邮件/密码**（Email/Password），用于本站登录、注册、登出。

（若以后要微信/Google 登录，再在此处启用对应提供商。）

### 4. 创建 Firestore 数据库

1. 左侧 **Firestore Database** → **创建数据库**。
2. 选择 **生产模式** 或 **测试模式**（测试模式会放开读写，仅建议开发用）。
3. 选一个地区（如 `europe-west1`），创建。

**集合与字段（代码中已按此结构读写，无需手动建表）：**

- **products**：商品（name, description, price, imageUrl, categoryId, stock, status 等）
- **categories**：分类（name, description 等）
- **orders**：订单（userId, items, totalAmount, status, shippingAddress 等）
- **users**：用户资料（displayName, role 等，与 Auth 的 uid 对应）

首次通过本站「管理后台」添加商品/分类、或用户注册/下单时，Firestore 会自动创建这些集合。

### 5. 配置 Firestore 安全规则（必做）

在 Firestore → **规则** 里，至少保证：

- 未登录用户：可读 `products`、`categories`（前台展示）。
- 已登录用户：可读/写自己的 `orders`、可读/写自己的 `users` 文档。
- 仅 admin 可写 `products`、`categories`、可读所有 `orders`。

示例（需按您的 `projectId` 和 admin 逻辑调整）：

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products { allow read: if true; allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'; }
    match /categories { allow read: if true; allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'; }
    match /orders {
      allow read, write: if request.auth != null && (resource == null ? request.auth.uid == request.resource.data.userId : resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    match /users/{userId} { allow read, write: if request.auth != null && request.auth.uid == userId; }
  }
}
```

发布规则后，前台和管理端才能按预期读写。

### 6. 启用 Storage（商品图片上传）

1. 左侧 **Storage** → **开始使用**。
2. 选择安全规则（测试模式或生产模式），选与 Firestore 相同或就近区域。

**Storage 规则建议：**

- 仅已登录用户可上传；仅 admin 可删/覆盖；所有人可读（用于展示商品图）。  
  具体规则可在 Storage → **规则** 中按需编写。

本站上传商品图时会写入 `products/xxx` 之类路径，您只要保证该路径允许 admin 写、所有人可读即可。

---

## 三、可选：第一个管理员账号

1. 在网站前台用 **注册** 功能注册一个账号（邮箱+密码）。
2. 在 Firestore **users** 集合中，找到对应该用户 uid 的文档，增加字段：`role: 'admin'`。
3. 该账号登录后即可访问 `/zh/admin`（或对应语言的 `/admin`）管理商品、分类、订单。

---

## 四、总结清单

| 您需要做的 | 说明 |
|------------|------|
| 提供 6 个环境变量 | 从 Firebase 控制台「项目设置 → 常规 → 您的应用」复制到 `.env.local` |
| 启用 邮箱/密码 登录 | Authentication → Sign-in method |
| 创建 Firestore | Firestore Database → 创建数据库 |
| 配置 Firestore 规则 | 保证公开读 products/categories，用户写自己的 orders/users，admin 可写商品/分类、可读订单 |
| 启用并配置 Storage | Storage → 开始使用；规则允许上传与公开读图 |

**不需要提供给我：**  
您只需在**自己电脑**的 `.env.local` 里填写上述 6 个变量，并在 Firebase 控制台完成上述设置。代码里已经按这些变量和集合结构写好，无需把 API Key 或私钥发给我。

如有部署（如 Vercel），在对应平台的「Environment Variables」里同样添加这 6 个变量即可。
