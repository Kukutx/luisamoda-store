# LZ FORTUNA

意大利本地百货和裁缝门店的介绍网站。**保留 Next.js + React + TypeScript + Tailwind CSS**，以静态方式构建，没有购物车、订单、会员、管理后台或数据库。

品牌主名称采用 **LZ FORTUNA**。主标题、顶部及页脚品牌名使用 **Cormorant Garamond 字体与 HTML/CSS**（真实文字、可复制、缩放清晰），副标题也是独立 HTML；不再把裁剪的 PNG 当作页面文字。**Luisa Moda** 仅保留为 Calusco d’Adda 老店的实际门店名称。

品牌图片：

- `public/brand/icon.png`、`apple-touch-icon.png`：浏览器和手机桌面图标（LZ 字母组合）。
- `public/brand/og-image.png`：在 WhatsApp、Facebook 等分享链接时显示的预览图，由批准的标志组合图生成。
- `design/brand/`：批准的原稿（标志组合、字标、字母组合）。不对外发布，也不要在页面里当文字用。

## 命名约定

| 场合 | 写法 |
|---|---|
| 品牌标识（Logo、标题、`<title>`、`site.name`） | **LZ FORTUNA** |
| 正文和门店名 | **LZ Fortuna**（Cologno Monzese 新店） |
| 代码标识、包名、域名、仓库名 | **`lzfortuna`**（包名 `lzfortuna-store`，网址 `lzfortuna.web.app`） |
| Calusco 老店 | **Luisa Moda**（实际门店名，只用于老店本身） |

不要写成 Lzfortuna、LZFortuna、LZ-Fortuna、Fortuna 单独使用或 lzfurtuna。Firebase 项目 ID `lzfortuna-store-cologno` 创建后无法改名，只承担旧地址跳转，保持不变。

## 两家门店

| 门店 | 地址 | 营业时间 | 联系方式 |
|---|---|---|---|
| LZ Fortuna（新店） | Cologno Monzese（街道地址待补） | 09:00–19:30 | **366 892 7486** |
| Luisa Moda（老店） | Piazza S. Rocco, 51, 24033 Calusco d’Adda (BG) | 09:00–19:30 | **统一联系新店** |

新店街道地址和两店每周营业日尚未提供；页面只展示已确认信息，新店地址留空时显示“地址可询问”，有地址的门店会自动显示 Google 地图链接，并写进结构化数据。**不要在网站代码中公开老店号码。** WhatsApp 和拨号都使用新店号码。

## 日常维护

- 仅修改 **`lib/site.ts`** 中的电话号码、门店名称、地址（`address`、`postalCode`、`province`）和时间。
- 当前前台仅保留意大利语。首页文案在 `app/page.tsx` 中修改；子页面共用的页眉页脚在 `components/subpage-chrome.tsx`，不包含多语言切换或额外国际化运行时依赖。
- 旧语言入口（`/zh/`、`/en/`、`/it/`）和旧服务链接通过 `firebase.json` 重定向到意大利语网站，避免旧二维码或收藏链接在当前域名下失效。
- `npm install` 安装依赖；`npm run dev` 本地预览。
- `npm run lint` 检查代码；`npm run typecheck` 检查类型；`npm run build` 生成静态版 **`out/`**；`npm test` 验证导出的网页及联系方式。
- TypeScript 采用当前 ESLint/Next.js 工具链兼容的最新 5.9；ESLint 使用兼容的 9.x，避免强制安装不兼容的主版本。

## 部署

**推荐 Firebase Hosting 静态托管**。虽然品牌使用 Firebase Hosting，但**不使用 Firebase Authentication、Firestore、Storage，也不运行服务端代码**。

1. Firebase 项目：`lzfortuna-store-cologno`（配置见 `.firebaserc`）。
2. 先执行 `npm run build`，再执行 `npm run deploy`（初次使用需先执行 `npx --yes firebase-tools@15.34.2 login` 登录自己的 Firebase 账户）。
3. `firebase.json` 的 `hosting.public` 为 `out`。

正式网站地址：<https://lzfortuna.web.app/>（旧地址自动跳转）。

裁缝服务价目表维护在 `lib/tailoring.ts`，网站页面为 `/sartoria/`。价目表源于提供的门店照片，展示参考价格，不代表未经确认的最终报价。

百货品类在 `lib/merchandise.ts` 中维护；`/prodotti/` 仅展示类别及说明，**不显示价格或虚构库存**。

首页两张卡片恢复**图片在上、文字在下**的原版结构。百货配图 `public/images/assortimento-prodotti.jpg` 用几种商品类别的免费图像拼成，不代表门店实拍或实时库存；使用的照片素材来自 Unsplash（服装 photo-1573612664822-d7d347da7b80，厨房 photo-1556911220-bff31c812dba，文具 photo-1513542789411-b6a5d4f31634，玩具 photo-1566576912321-d58ddd7a6088）。裁缝卡片没有 WhatsApp 按钮，黑色 WhatsApp 按钮只在顶部导航栏以及原有联系区域。收到真实门店照片后可替换百货配图。

构建时会生成意大利语 404 页（`app/not-found.tsx`）、`robots.txt` 和 `sitemap.xml`（`app/robots.ts`、`app/sitemap.ts`）；新增页面时记得加进 sitemap。

GitHub Actions 仅用于 lint、类型检查和静态构建验证，不会未经配置自动部署。

## 面向本地顾客的设计约定

来店顾客多数有点年纪，也有年轻人和带孩子的家庭。页面保持黑白品牌风格，同时：

- 正文至少 16px（多数 18px），标签至少 14px，不用很淡的灰字；测试会拦下 `text-xs` 和低对比度文字。
- 首屏就有“WhatsApp / 打电话”大按钮；手机底部固定联系栏（`components/contact-bar.tsx`）。
- “Come possiamo aiutarti?” 三个入口会打开带好开头的 WhatsApp 消息（`whatsappWith()`，在 `lib/site.ts`）。
- 每家店的介绍、卖什么、地址、TikTok 都在 `lib/site.ts` 的 `stores` 里维护。
