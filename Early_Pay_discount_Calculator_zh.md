# 产品需求文档 (PRD)

## 早付利润计算器

### 1. 目的/概述

设计并推出一个交互式网页组件，让中小型企业(SME)借款人能够量化通过使用**Lendica PayLater**提前支付供应商可以**节省和释放**多少资金。该计算器输出释放的现金、有效借款成本、年度净节省，并与其他融资产品进行比较。

### 2. 目标和成功指标

| 目标 | 指标 | 目标值 |
| --- | --- | --- |
| 生成合格的潜在客户 | 发送的电子邮件摘要数量 | ≥ 25% 的访问者 |
| 推动PayLater采用 | "开始申请"点击次数 | ≥ 15% 的访问者 |
| 教育用户了解节省 | 页面平均停留时间 | ≥ 90秒 |

### 3. 关键角色

- **中小企业所有者/CFO** – 希望降低销售成本并改善营运资金。
- **Lendica销售AE** – 使用摘要PDF启动对话。

### 4. 用户故事(理想路径)

1. *作为中小企业*，我输入我的月收入、供应商支出和供应商提供的折扣，立即看到潜在节省。
2. *作为中小企业*，我调整向Lendica还款的日期(0-60天)，并实时查看结果更新。
3. *作为中小企业*，我可以通过电子邮件向自己发送干净、带品牌的摘要PDF。
4. *作为销售AE*，我在CRM中收到相同的PDF，为外联做准备。

### 5. 功能需求

### 5.1 输入(全滑块用户体验)和验证

| 字段 | 滑块范围 | 步长(值间隔) | 默认值 | 显示格式 | 规则 |
| --- | --- | --- | --- | --- | --- |
| 月收入 | $50k – $50M | 动态(见指南) | $2,000,000 | 货币 | > 0 |
| 月供应商支出 | $0 – 月收入 | 动态(见指南) | $1,000,000 | 货币 | 0 < ≤ 月收入 |
| 早付折扣(%) | 0 – 5% | 0.1% | 1% | 百分比 | - |
| 折扣窗口(天数) | 1 – 30 | 1 | 10 | 整数 | - |
| 标准期限(净天数) | 折扣窗口+1 – 120 | 1 | 30 | 整数 | - |
| 在第*R*天向Lendica还款(发票日期) | 0 – 60 | 1 | 60 | 整数 | 必须 ≥ 折扣窗口 |

### 5.1.1 滑块步长(值间隔)指南

- **货币字段的动态步长**
    - 步长 = `max(roundUp(rangeMax × 0.005, 1000), 10000)` → 大约为范围的0.5%，但不低于$10k，始终四舍五入到最接近的$1k。
    - 在$1M范围以下，切换到$1k步长以允许精确度。
    - 实现：基于当前`rangeMax`(可能在收入滑块移动后更改)在组件挂载时计算步长。
- **供应商支出滑块与收入耦合**
    - 每当收入变化时更新其`max`并重新计算步长。
    - 通过硬性限制值并显示辅助文本，保持支出≤收入。
- **还款日滑块取决于折扣窗口**
    - 滑块显示绝对发票日(0-60)。变更时，计算**有效贷款天数** `L = max(0, R − discountWindow)`。
    - 如果用户设置*R* < discountWindow，则返回到`discountWindow`并显示工具提示"还款不能早于供应商付款"。
- **百分比和天数滑块**
    - 固定的小整数/小数步长，以便精细控制(0.1%，1天)，因为绝对范围较窄。
- **键盘和精细调整便利性**
    - 方向键移动1×步长；Shift + 方向键移动10×步长；需要精确数字的用户可以点击值徽章直接编辑。
- **性能**
    - 将昂贵的计算延迟到50毫秒，以便高频滑块事件不会大量消耗React状态。

### 5.2 计算(权威公式)

```
// 常量(从后端提供的费率层级)
RATE_TIERS = [                // 简化代码示例
  { revenue_max: 250000,  monthly_rate: 0.025  },
  { revenue_max: 1000000, monthly_rate: 0.0208 },
  { revenue_max: 10000000,monthly_rate: 0.0167 },
  { revenue_max: 50000000,monthly_rate: 0.015  }
]
ALT_RATES = {"信用卡":0.245,"MCA":0.62,"保理":0.30}
DAYS_IN_MONTH = 30

// 辅助函数
def getPayLaterRate(monthlyRevenue):
    for tier in RATE_TIERS:
        if monthlyRevenue <= tier.revenue_max:
            return tier.monthly_rate
    return RATE_TIERS[-1].monthly_rate  // 默认使用最低费率

// 用户输入
monthlyRevenue
supplierSpend
R  // 还款日
discountWindow

// 派生值
paylaterMonthlyRate = getPayLaterRate(monthlyRevenue)
loanDays = max(0, R - discountWindow)
financingFactor = loanDays / DAYS_IN_MONTH               // 融资的月份分数

// 1. PayLater信用额度(释放的现金)
paylaterLine = monthlyRevenue * 0.25 * financingFactor

// 2. 符合融资条件的支出
spendUsed = min(supplierSpend, paylaterLine)

// 3. 折扣收益(每月)
benefit = spendUsed * discountRate

// 4. 实际贷款期限的PayLater成本
plCost = spendUsed * paylaterMonthlyRate * financingFactor

// 5. 正常利率(月度) – PayLater基本标题利率
normalRateMonthly = paylaterMonthlyRate                // 1.40%

// 6. 有效利率(月度) – 扣除早付收益后的净值
if financingFactor > 0:
    netRateMonthly = (plCost - benefit) / spendUsed / financingFactor
else:
    netRateMonthly = 0

// 7. 年度净节省
netSavingAnnual = spendUsed * (NormalMonthlyRate * FinancingFactor - NetRateMonthly * FinancingFactor) * 12

// 8. 替代产品成本表(月度标准化)
for (name, altRate) in ALT_RATES:
    altCostMonthly[name] = spendUsed * altRate * financingFactor   // 期间成本
    altRateMonthly[name] = altRate                                // 已经是月度标题利率
```

边缘情况：如果financingDays < discountWindow，则设置financingDays = discountWindow以防止负成本；如果benefit ≤ plCost，以警告样式突出显示结果。

### 5.3 输出(所有利率显示为月度标准化)

- **释放的现金(PayLater额度)** – 美元格式化的`paylaterLine`。
- **正常利率(月度)** – 从费率层级派生的`normalRateMonthly`(%)。
- **有效利率(月度)** – `netRateMonthly`(%) (折扣后的净借款成本，标准化为月度)。
- **净节省(年度)** – 美元格式化的`netSavingAnnual`。
- **替代产品比较** – `altRateMonthly`值表格。
- **动态CTA状态** – 如果`netSavingAnnual > 0`，则"开始申请"启用。

### 6. UI/UX需求

- 遵循**aescape.com/roi**的布局节奏(主标题，左侧输入面板，右侧结果卡)。使用Lendica品牌颜色(#0052CC主色，#00C389强调色)。
- 动画：对美元数字使用计数效果；还款日平滑滑块。
- 工具提示(i)解释每个指标；图标集：Lucide-react。
- 移动设备上底部固定CTA栏。

### 线框图和组件

| 组件 | 库 |
| --- | --- |
| 滑块(通用数字+货币) | 扩展`@/components/ui/slider`以显示格式化的值徽章 |
| 结果卡 | 来自shadcn/ui的`Card` |
| PDF按钮 | `Button` variant="secondary" |

设计师必须在Figma中提供滑块样式变体(货币，%，天数)，包括焦点状态和移动友好的滑块大小(≥44 px触摸目标)。

### 7. 费率层级配置(由后端提供的可编辑JSON)

```json
[
  {"revenue_max":250000,"best_annual_rate":0.30,"best_monthly_rate":0.025},
  {"revenue_max":1000000,"best_annual_rate":0.25,"best_monthly_rate":0.0208},
  {"revenue_max":10000000,"best_annual_rate":0.20,"best_monthly_rate":0.0167},
  {"revenue_max":50000000,"best_annual_rate":0.18,"best_monthly_rate":0.015 }
]
```

后端暴露`/v1/rates`，根据`monthlyRevenue`返回用户的层级。

### 8. API契约

| 方法 | 路由 | 请求 | 响应 | 认证 |
| --- | --- | --- | --- | --- |
| POST | `/v1/calc` | JSON输入 | 计算输出JSON | 无 |
| POST | `/v1/email-summary` | {email, inputs} | 202/400 | reCAPTCHA v3 |

延迟预算：p95 < 150毫秒。

### 9. 所需工程资产

- **设计**：Figma，导出的SVG图标，完整样式指南。
- **文案**：市场认可的微文案和i18n JSON格式的工具提示文本。
- **配置JSON**：费率层级表(见§7)。
- **PDF模板**：用于服务器端生成的品牌HTML/CSS或.docx。
- **环境变量**：`RECAPTCHA_SITE_KEY`，`RECAPTCHA_SECRET`，`SENDGRID_API_KEY`。
- **CI/CD管道**：合并时预览部署到`/roi-calculator`。

### 10. 验收标准

1. 输入规范中的示例值返回**正常 = 1.40%，有效 ≈ 0.81%，净节省 ≈ $70,667**。
2. Safari iOS 17上的Crest测试通过Lighthouse性能评分 ≥ 90。
3. 在60秒内收到摘要电子邮件，包含匹配的数字和指向入职流程的CTA链接。

### 11. 待解决问题

- PayLater费率是固定的还是根据借款人动态变化的？(影响后端缓存TTL)
- 高级用户是否应该能够编辑替代产品费率？
- CRM挂钩：PDF应附加到哪个对象？

### 12. 早付利润计算器的代表性测试案例

| **场景** | **正常利率(月度)** | **有效利率(月度)** | **净节省(年度)** | **释放的现金** |
| --- | --- | --- | --- | --- |
| 收入 = $200k<br>支出 = $100k<br>折扣 = 1%<br>窗口 = 10天<br>还款 = 60天 | **2.50%** | **1.90%** | **$10,000** | **$83,333** |
| 收入 = $2M<br>支出 = $1M<br>折扣 = 1%<br>窗口 = 10天<br>还款 = 60天 | **1.67%** | **1.07%** | **$100,000** | **$833,333** |
| 收入 = $10M<br>支出 = $5M<br>折扣 = 2%<br>窗口 = 15天<br>还款 = 45天 | **1.67%** | **-0.33%** | **$600,000** | **$2,500,000** |

**备注**

- *正常利率(月度)*是从层级表返回的PayLater标题利率。
- *有效利率(月度)*为实际融资期扣除早付折扣收益后的净值。
- 负有效利率意味着折扣收益超过融资成本，使融资有增值效果。
- *净节省(年度)* = 使用的支出 × 正常利率与有效利率的差异 × 贷款期限因子 × 12。
- *释放的现金*是转换为指定贷款期可用信贷的月收入部分。 