# GitHub Actions 自动化说明

仓库已配置以下自动化，**无需额外设置**即可使用（推送后自动运行）。

## 1. CI（质量门禁）

- **触发**：每次推送到 `main`/`master` 或打开 PR 时
- **执行**：`npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`
- **作用**：未通过则 PR 无法合并、推送会显示失败，保证主分支可构建、无 lint/类型错误

## 2. Auto Fix（自动修 lint）

- **触发**：每次推送到 `main`/`master` 时（且本次提交不是 auto-fix 自己产生的）
- **执行**：`npm run lint:fix`，若有变更则自动 `git commit` + `git push`
- **作用**：ESLint 能自动修的问题（如引号、缩进等）会由 CI 自动修好并推回仓库，你只需正常写代码、推送即可

**你只需要**：照常 `git push`，若 CI 修了代码，到 GitHub 拉一次 `git pull` 即可。

## 3. Deploy to Vercel（部署）

- 见 [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)：连接 Vercel 后，每次推送到 `main` 会自动部署。

## 本地建议

- 推送前可本地执行：`npm run lint:fix`、`npm run typecheck`、`npm run build`，与 CI 保持一致，减少失败次数。
