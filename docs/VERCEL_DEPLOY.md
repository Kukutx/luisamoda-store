# Vercel 部署说明

## 方式一：推荐 - Vercel 自带 Git 集成（零配置）

1. 打开 [Vercel](https://vercel.com) 并登录。
2. 点击 **Add New… → Project**，选择 **Import Git Repository**。
3. 选择仓库 `Kukutx/luisamoda-store`，点击 **Import**。
4. 在 **Environment Variables** 中填入你的 Firebase 环境变量（与 `.env.local` 一致）：
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. 点击 **Deploy**。之后每次推送到 `main`（或你设置的生产分支），Vercel 会自动构建并部署。

无需在 GitHub 配置任何 Secrets，CI 仍会通过 `.github/workflows/ci.yml` 跑 lint 和 build。

---

## 方式二：仅用 GitHub Actions 部署（需配置 Secrets）

若你希望**只**用 GitHub Actions 触发 Vercel 部署（不用 Vercel 的 Git 集成），需要先完成一次「方式一」在 Vercel 创建项目，然后：

1. **获取 Vercel Token**  
   [Vercel Account Settings → Tokens](https://vercel.com/account/tokens) 新建一个 Token。

2. **获取 Org ID 与 Project ID**  
   在项目根目录执行一次：
   ```bash
   npx vercel link
   ```
   按提示选择 Team 和项目后，打开 `.vercel/project.json`，里面有 `orgId` 和 `projectId`。  
   也可在 Vercel 项目 **Settings → General** 页面底部看到。

3. **在 GitHub 仓库配置 Secrets**  
   仓库 → **Settings → Secrets and variables → Actions**，新建：

   | Name | 说明 |
   |------|------|
   | `VERCEL_TOKEN` | 上一步创建的 Vercel Token |
   | `VERCEL_ORG_ID` | `.vercel/project.json` 里的 `orgId` |
   | `VERCEL_PROJECT_ID` | `.vercel/project.json` 里的 `projectId` |
   | `NEXT_PUBLIC_FIREBASE_*` | 各 Firebase 环境变量（与本地一致） |

4. 之后每次推送到 `main`/`master`，`.github/workflows/deploy-vercel.yml` 会自动部署到 Vercel 生产环境。

---

## 缺什么补什么

- **仅用方式一**：只需在 Vercel 填好 Firebase 环境变量即可。
- **用方式二**：需要补全上述 GitHub Secrets（`VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID` 以及所有 `NEXT_PUBLIC_FIREBASE_*`）。
