# Luisa Moda Store - 优化检查清单

本文档基于对项目的全面检查，列出可优化点及建议优先级。

> **已实施**：以下高优先级与中优先级项均已在代码中落地；构建与 `tsc --noEmit` 已通过。

---

## 一、类型安全（高优先级）

### 1.1 移除路由/导航中的 `as any`

**现状**：多处使用 `router.push(ROUTES.xxx as any)`、`Link href={... as any}`，削弱类型安全。

**涉及文件**：
- `app/[locale]/login/page.tsx` - `router.push('/' as any)`
- `app/[locale]/register/page.tsx` - `router.push('/' as any)`
- `app/[locale]/admin/layout.tsx` - 多处 Link / router.push
- `app/[locale]/checkout/page.tsx` - `router.push(ROUTES.HOME as any)`
- `app/[locale]/cart/page.tsx` - Link、router.push
- `components/user/Header.tsx` - `href={item.path as any}`（两处）
- `components/user/ProductCard.tsx` - Link href
- `components/user/ProductDetailClient.tsx` - router.push
- `hooks/useRequireAuth.ts` - router.push

**建议**：
- 在 `i18n/routing.ts` 的 `pathnames` 中补全与 `ROUTES` 对应的路径（含 `/login`、`/register`、`/admin` 等），或
- 使用 next-intl 官方推荐的 Pathnames 类型扩展（见 next-intl 文档），定义 `AppPathnames` 类型并让 `Link`/`useRouter` 使用，即可去掉所有 `as any`。

### 1.2 Locale 类型

**现状**：`app/[locale]/layout.tsx` 与 `i18n/request.ts` 中使用 `locale as any` 配合 `routing.locales.includes()`。

**建议**：定义并导出 locale 联合类型，例如：

```ts
// i18n/routing.ts 或 types/index.ts
export type Locale = (typeof routing.locales)[number]; // 'zh' | 'en' | 'it'
```

在 layout 与 request 中将 `params.locale` 断言为 `Locale` 或先做类型守卫再传入，避免 `as any`。

### 1.3 Firestore 数据转换

**现状**：`lib/firebase/firestore.ts` 中 `convertTimestamp` 参数为 `data: any`。

**建议**：改为泛型或接受 `Record<string, unknown>`，在内部做 Timestamp 检测与转换，返回类型为 `T`，减少 any 扩散。

### 1.4 useAsyncData 的 catch

**现状**：`hooks/useAsyncData.ts` 中 `catch (err: any)`，并用 `err.message`、`err.code` 构造 `ApiError`。

**建议**：使用 `catch (err: unknown)`，用 `err instanceof Error` 或类型收窄安全地读取 `message`/`code`，避免 any。

### 1.5 管理端表单与表格类型

**现状**：
- `app/[locale]/admin/products/[id]/page.tsx` 中 `useAsyncData(async (values: any) => ...)`。
- `app/[locale]/admin/orders/page.tsx` 中表格列 `render: (d: any)`（日期列）。

**建议**：
- 产品表单：将 `values` 改为 `ProductFormData`（或与 Form 字段一致的接口）。
- 订单表格：将日期列参数改为 `Date | Timestamp` 或 `Order['createdAt']`。

---

## 二、错误处理与用户反馈（高优先级）

### 2.1 结账页下单失败无用户提示

**文件**：`app/[locale]/checkout/page.tsx`

**现状**：`createOrder` 失败时仅 `console.error`，界面无错误提示。

**建议**：增加 `error` 状态（或使用 `useAsyncData` 的 error），在 catch 中 setError，在表单区域展示错误信息（或使用 Ant Design `message.error`/Toast），避免用户误以为提交成功。

### 2.2 Firestore 错误仅回退到 Mock，无日志

**文件**：`lib/firebase/firestore.ts`

**现状**：catch 中直接返回 mock 数据，不区分「未配置 Firebase」与「请求失败」，且无日志。

**建议**：
- 在 catch 中至少 `console.error`（或接入日志/监控），便于排查。
- 若需区分「无 Firebase」与「网络/权限错误」，可对 error 做简单分类，在关键路径（如下单、支付）考虑向用户展示「服务暂时不可用」等提示。

### 2.3 管理端订单列表使用 Next 原生 router

**文件**：`app/[locale]/admin/orders/page.tsx`

**现状**：`router.push(...)` 来自 `next/navigation`，跳转会丢失 locale 前缀。

**建议**：改用 `@/i18n/routing` 的 `useRouter`，跳转路径使用 `ROUTES.ADMIN.ORDERS + '/' + record.id` 或封装好的 path helper，并配合 pathnames 类型去掉 `as any`。

---

## 三、配置与文档（中优先级）

### 3.1 Next.js 图片域名配置已弃用

**文件**：`next.config.js`

**现状**：使用 `images: { domains: ['...'] }`，Next.js 14+ 已弃用 `domains`。

**建议**：改为 `remotePatterns`，例如：

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/**' },
    { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
  ],
},
```

### 3.2 缺少 .env 示例文件

**现状**：README 提到「复制 `.env.local.example` 为 `.env.local`」，但仓库中无 `.env.local.example`。

**建议**：新增 `.env.local.example`，列出所有 `NEXT_PUBLIC_FIREBASE_*` 占位变量（不填真实密钥），便于新成员本地配置。

### 3.3 README 与真实路由结构不一致

**现状**：README 中写「app/admin」「app/products」等，实际为 `app/[locale]/admin`、`app/[locale]/products`。

**建议**：在 README 的「项目结构」中改为 `app/[locale]/admin`、`app/[locale]/products` 等，避免误导。

### 3.4 README 技术栈版本

**现状**：README 写「Next.js 14+」，项目实际为 Next.js 15.2 canary。

**建议**：更新为「Next.js 15 (App Router)」或当前使用版本，保持与 package.json 一致。

---

## 四、代码结构与 DRY（中优先级）

### 4.1 Firestore 快照映射重复

**文件**：`lib/firebase/firestore.ts`

**现状**：多处 `snapshot.docs.map(doc => ({ id: doc.id, ...convertTimestamp<any>(doc.data()) }))` 重复。

**建议**：抽成通用 helper，例如：

```ts
function mapSnapshotTo<T>(snapshot: QuerySnapshot, toEntity: (id: string, data: T) => T): T[] {
  return snapshot.docs.map(d => toEntity(d.id, convertTimestamp<T>(d.data())));
}
```

或至少 `docToEntity<T>(doc: DocumentSnapshot): T`，在 getProducts/getCategories/getOrders/getUsers 等处复用，减少重复与 `convertTimestamp<any>` 的使用。

### 4.2 Cart Context 回调未 memo

**文件**：`context/CartContext.tsx`

**现状**：`getTotalPrice`、`getTotalItems` 每次渲染都是新函数引用。

**建议**：使用 `useCallback` 包裹，依赖 `[items]`。若这些函数会作为 props 传入子组件或用于 useEffect，可减少不必要的重渲染。

---

## 五、性能与打包（可选）

### 5.1 管理端代码分割

**现状**：Ant Design 仅管理端使用，若 admin 与 storefront 在同一入口加载，会增大首屏 bundle。

**建议**：对 `app/[locale]/admin/layout.tsx` 或 admin 根组件使用 `next/dynamic` 懒加载，使 Ant Design 仅在进入 admin 时加载；或确认 Next 已按路由做 code split（通常已做），再通过 bundle 分析确认 admin 与主站 chunk 分离情况。

### 5.2 首页翻译命名空间

**现状**：首页 footer 使用 `useTranslations('Header')`，逻辑正确但可读性略差。

**建议**：若希望语义更清晰，可在页面顶部统一 `const tHeader = useTranslations('Header')`，footer 复用 `tHeader`，避免在底部再次写 'Header'。

---

## 六、测试与质量（可选）

### 6.1 无自动化测试

**现状**：`package.json` 无 test 脚本，无 Jest/Vitest 等，无测试文件。

**建议**：至少增加 `lint` 与 `typecheck`（如 `tsc --noEmit`）；若有精力可引入 Vitest，优先为 `lib/utils.ts`（formatPrice、formatDate 等）、`useAsyncData`、Cart 增减逻辑编写单元测试，再考虑关键流程的 E2E（如登录、加购、下单）。

---

## 七、安全与运维（建议确认）

### 7.1 Firebase 仅客户端

**现状**：所有数据通过客户端 Firebase SDK 访问，无 `app/api` 接口；权限依赖 Firestore/Storage 规则。

**建议**：确认 Firestore 与 Storage 规则已按 README 严格限制（用户仅能读写自己的数据，管理端仅 admin 可写），且敏感操作（如订单状态变更、用户角色）除规则外无其他可被滥用的入口。

### 7.2 管理员设定方式

**现状**：README 说明需在 Firestore 控制台手动将用户 `role` 改为 `admin`。

**建议**：保持「首次管理员手动改」即可；若未来做「邀请码/超级管理员创建 admin」，需在服务端或受控环境完成，避免仅靠客户端可篡改的字段提升权限。

---

## 优先级汇总

| 优先级 | 类别           | 项数 | 说明                           |
|--------|----------------|------|--------------------------------|
| 高     | 类型安全       | 5    | 去掉 as any、补全类型          |
| 高     | 错误处理与反馈 | 3    | 结账错误提示、Firestore 日志、admin 路由 |
| 中     | 配置与文档     | 4    | next.config、.env 示例、README |
| 中     | DRY/结构       | 2    | Firestore 映射、Cart useCallback |
| 可选   | 性能/测试/安全 | 4    | 代码分割、测试、安全复核       |

建议先完成「高优先级」与「中优先级」中的配置/文档项，再按需做可选优化。若你希望从某一块开始落地，我可以按文件给出具体修改 diff 或补全代码片段。
