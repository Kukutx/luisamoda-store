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

## 二、项目里已经帮您准备好的文件

以下文件已经在项目根目录准备好，可直接用于发布规则：

- `firestore.rules`
- `storage.rules`
- `firebase.json`
- `.firebaserc`

当前 `.firebaserc` 已指向您的 Firebase 项目：`luisa-moda`。

---

## 三、在 Firebase 控制台需要做的设置

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

### 5. 发布 Firestore 安全规则（必做）

项目里已经有适配本站逻辑的 `firestore.rules`，规则特点如下：

- 未登录用户：可读 `products`、`categories`（前台展示）。
- 游客：可创建 `anonymous` 询价订单（适合不注册直接提交询价）。
- 已登录用户：可读取自己的订单，可读/改自己的用户资料，但不能把自己改成 admin。
- 仅 admin 可写 `products`、`categories`、可读所有 `orders`、可管理所有 `users`。

发布方式二选一：

**方式 A：在 Firebase 控制台手动粘贴**

1. 打开 **Firestore Database** → **规则**
2. 把项目根目录里的 `firestore.rules` 内容全部复制进去
3. 点击「发布」

**方式 B：用项目命令直接发布**

```bash
npm run firebase:login
npm run firebase:rules:deploy:firestore
```

如果您想看规则内容，直接打开项目根目录的 `firestore.rules` 即可。

### 6. 启用 Storage（商品图片上传）

1. 左侧 **Storage** → **开始使用**。
2. 选择安全规则（测试模式或生产模式），选与 Firestore 相同或就近区域。

项目里已经有适配本站后台商品上传的 `storage.rules`，规则特点如下：

- `products/**` 下图片：所有人可读
- 只有 admin 可上传、覆盖、删除
- 仅允许图片类型
- 单文件大小限制 5MB

发布方式同样二选一：

**方式 A：控制台粘贴**

1. 打开 **Storage** → **规则**
2. 把项目根目录里的 `storage.rules` 内容复制进去
3. 点击「发布」

**方式 B：项目命令**

```bash
npm run firebase:login
npm run firebase:rules:deploy:storage
```

---

## 四、第一个管理员账号怎么设

这是当前项目最适合的方式，因为本站的管理员权限来自 `users/{uid}.role`：

1. 在网站前台用 **注册** 功能注册一个账号（邮箱+密码）。
2. 注册完成后，打开 **Firestore Database** → **数据**
3. 进入 `users` 集合
4. 找到刚注册用户的文档，文档 ID 就是该用户的 `uid`
5. 编辑字段，把 `role` 从 `user` 改成 `admin`
6. 保存后重新登录网站
7. 现在该账号就可以访问 `/zh/admin`（或对应语言的 `/admin`）

### 管理员文档建议长这样

```json
{
  "email": "your-admin@example.com",
  "displayName": "Luisa Admin",
  "role": "admin"
}
```

### 重要说明

- 普通用户注册时，代码会自动创建 `users/{uid}`，并默认写入 `role: 'user'`
- Firestore 规则已经阻止普通用户自行把 `role` 改成 `admin`
- 所以首个管理员必须由您在 Firebase 控制台里手动改一次

---

## 五、一键发布命令

项目里已经补好了这些 npm 命令：

```bash
npm run firebase:login
npm run firebase:rules:deploy
npm run firebase:rules:deploy:firestore
npm run firebase:rules:deploy:storage
```

首次使用时建议顺序：

```bash
npm run firebase:login
npm run firebase:rules:deploy
```

---

## 六、总结清单

| 您需要做的 | 说明 |
|------------|------|
| 提供 6 个环境变量 | 从 Firebase 控制台「项目设置 → 常规 → 您的应用」复制到 `.env.local` |
| 启用 邮箱/密码 登录 | Authentication → Sign-in method |
| 创建 Firestore | Firestore Database → 创建数据库 |
| 发布 Firestore 规则 | 已提供 `firestore.rules`，发布即可 |
| 启用并发布 Storage 规则 | 已提供 `storage.rules`，发布即可 |
| 手动设置第一个管理员 | 到 `users/{uid}` 把 `role` 改成 `admin` |

**不需要提供给我：**  
您只需在**自己电脑**的 `.env.local` 里填写上述 6 个变量，并在 Firebase 控制台完成上述设置。代码里已经按这些变量和集合结构写好，无需把 API Key 或私钥发给我。

如有部署（如 Vercel），在对应平台的「Environment Variables」里同样添加这 6 个变量即可。
