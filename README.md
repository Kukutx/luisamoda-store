# Luisa Moda - 百货商店网站

一个功能完整的精品时尚网站，包含用户端和管理端，使用 Next.js、TypeScript、Tailwind CSS、Ant Design 和 Firebase 构建。

## 功能特性

### 用户端

- ✅ 商品浏览（列表、分类筛选、搜索）
- ✅ 商品详情页
- ✅ 购物车功能（添加、删除、数量调整）
- ✅ 订单管理（创建、查看、状态跟踪）
- ✅ 用户认证（登录、注册、登出）
- ✅ 个人中心（资料管理）

### 管理端

- ✅ 仪表盘（统计数据）
- ✅ 商品管理（增删改查、图片上传）
- ✅ 订单管理（查看、状态更新）
- ✅ 分类管理（增删改查）
- ✅ 用户管理（查看用户列表）

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS (用户端) + Ant Design (管理端)
- **后端**: Firebase
  - Authentication (用户认证)
  - Firestore (数据库)
  - Storage (图片存储)

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Firebase

1. 在 [Firebase Console](https://console.firebase.google.com/) 创建新项目
2. 启用以下服务：
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. 获取 Firebase 配置信息
4. 复制 `.env.local.example` 为 `.env.local` 并填入配置：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. 配置 Firestore 安全规则

在 Firebase Console 中设置 Firestore 安全规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户数据：用户只能读写自己的数据，管理员可以读写所有
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        (request.auth.uid == userId ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // 商品数据：所有人可读，仅管理员可写
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // 分类数据：所有人可读，仅管理员可写
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // 订单数据：用户只能读写自己的订单，管理员可以读写所有
    match /orders/{orderId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null &&
        (request.auth.uid == resource.data.userId ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 4. 配置 Storage 安全规则

在 Firebase Console 中设置 Storage 安全规则：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 商品图片：所有人可读，仅管理员可写
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. 创建第一个管理员账号

1. 运行开发服务器：`npm run dev`
2. 访问网站并注册一个账号
3. 在 Firebase Console 的 Firestore 中，找到 `users` 集合
4. 找到你刚注册的用户文档，将 `role` 字段从 `user` 改为 `admin`
5. 重新登录即可访问管理后台

### 6. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 项目结构

```
luisamoda-store/
├── app/
│   └── [locale]/           # 多语言路由
│       ├── admin/         # 管理端页面
│       ├── products/       # 商品详情页
│       ├── cart/           # 购物车页
│       ├── orders/         # 订单页
│       ├── login/          # 登录页
│       ├── register/       # 注册页
│       ├── profile/        # 个人中心
│       ├── checkout/       # 结账页
│       └── layout.tsx      # 根布局
├── components/             # React 组件
│   ├── user/               # 用户端组件
│   └── ui/                 # 通用 UI 组件
├── context/                # React Context
│   ├── AuthContext.tsx     # 认证上下文
│   └── CartContext.tsx     # 购物车上下文
├── lib/                    # 工具库
│   ├── firebase/           # Firebase 配置和函数
│   └── utils.ts            # 工具函数
├── i18n/                   # 国际化（next-intl）
└── types/                  # TypeScript 类型定义
```

## 注意事项

1. **管理员权限**: 首次使用时需要在 Firestore 中手动将用户角色设置为 `admin`
2. **图片上传**: 商品图片会存储在 Firebase Storage 中
3. **购物车**: 购物车数据存储在浏览器 localStorage 中
4. **订单状态**: 管理员可以在管理后台更新订单状态

## 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint

## 许可证

MIT
