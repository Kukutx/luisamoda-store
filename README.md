# LZFortuna-store & Luisa Moda

意大利本地裁缝/改衣服务介绍网站。**保留 Next.js + React + TypeScript + Tailwind CSS**，以静态方式构建，没有购物车、订单、会员、管理后台或数据库。

## 两家门店

| 门店 | 地区 | 营业时间 | 联系方式 |
|---|---|---|---|
| LZFortuna-store（新店） | Cologno Monzese | 09:00–19:30 | **366 892 7486** |
| Luisa Moda（老店） | Calusco | 09:00–19:30 | **统一联系新店** |

两店的街道地址、每周营业日尚未提供；页面只展示已确认信息。**不要在网站代码中公开老店号码。** WhatsApp 和拨号都使用新店号码。

## 日常维护

- 仅修改 **`lib/site.ts`** 中的电话号码、门店名称、地址和时间。
- 文案及中/意/英三种语言在 `app/page.tsx` 中修改，默认意大利语。
- `npm install` 安装依赖；`npm run dev` 本地预览。
- `npm run lint` 检查代码；`npm run typecheck` 检查类型；`npm run build` 生成静态版 **`out/`**；`npm test` 验证导出的网页及联系方式。
- TypeScript 采用当前 ESLint/Next.js 工具链兼容的最新 5.9；ESLint 使用兼容的 9.x，避免强制安装不兼容的主版本。

## 部署

**推荐 Firebase Hosting 静态托管**。虽然品牌使用 Firebase Hosting，但**不使用 Firebase Authentication、Firestore、Storage，也不运行服务端代码**。

1. Firebase 项目：`luisa-moda`（配置见 `.firebaserc`）。
2. `npm run build`，然后 `npx firebase-tools deploy --only hosting`，或 `npm run deploy`。
3. `firebase.json` 的 `hosting.public` 为 `out`。

GitHub Actions 仅用于 lint、类型检查和静态构建验证，不会未经配置自动部署。GitHub 仍用于存放代码。旧 Vercel 集成不再需要。
