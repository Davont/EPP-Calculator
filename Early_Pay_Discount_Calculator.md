# Product Requirements Document (PRD)

## Early‑Pay Profit Calculator

### 1. Purpose / Overview

Design and ship an interactive web component that lets Small– & Medium‑Sized Enterprise (SME) borrowers quantify how much they can **save and unlock** by paying suppliers early with **Lendica PayLater**. The calculator outputs cash unlocked, effective borrowing cost, net annual savings, and a comparison with other financing products.

### 2. Goals & Success Metrics

| Goal | Metric | Target |
| --- | --- | --- |
| Generate qualified leads | # of email summaries sent | ≥ 25 % of visitors |
| Drive PayLater adoption | # "Start Apply" clicks | ≥ 15 % of visitors |
| Educate users on savings | Avg. time on page | ≥ 90 sec |

### 3. Key Personas

- **SME Owner / CFO** – wants to reduce COGS and improve working capital.
- **Lendica Sales AE** – uses the summary PDF to start a conversation.

### 4. User Stories (Happy Path)

1. *As an SME*, I enter my monthly revenue, supplier spend, and vendor‑offered discount and immediately see potential savings.
2. *As an SME*, I tweak the day I’ll repay Lendica (0–60 days) and watch results update live.
3. *As an SME*, I can email myself a clean, branded summary PDF.
4. *As a Sales AE*, I receive the same PDF in CRM to prep outreach.

### 5. Functional Requirements

### 5.1 Inputs (All‑Slider UX) & Validation

| Field | Slider Range | Step (Value Gap) | Default | Display Format | Rules |
| --- | --- | --- | --- | --- | --- |
| Monthly revenue | $50k – $50 M | Dynamic (see guidance) | $2,000,000 | Currency | > 0 |
| Monthly supplier spend | $0 – Monthly revenue | Dynamic (see guidance) | $1,000,000 | Currency | 0 < ≤ Monthly revenue |
| Early‑pay discount (%) | 0 – 5 % | 0.1 % | 1 % | Percentage | ‑ |
| Discount window (days) | 1 – 30 | 1 | 10 | Integer | ‑ |
| Standard terms (Net‑days) | Discount window+1 – 120 | 1 | 30 | Integer | ‑ |
| Repay Lendica on day *R*(invoice date) | 0 – 60 | 1 | 60 | Integer | Must be ≥ Discount window |

### 5.1.1 Slider Step (Value Gap) Guidelines

- **Dynamic stepping for currency fields**
    - Step = `max( roundUp(rangeMax × 0.005, 1000), 10000 )` → roughly 0.5 % of the range, but never below $10k and always rounded to the nearest $1k.
    - Below $1 M range, switch to $1k steps to allow precision.
    - Implementation: compute step on component mount based on current `rangeMax` (which may change after revenue slider moves).
- **Supplier spend slider couples to revenue**
    - Update its `max` and recompute step any time revenue changes.
    - Maintain spend ≤ revenue by hard‑clamping value and showing helper text.
- **Repay day slider depends on discount window**
    - Slider shows absolute invoice‑day (0‑60). On change, compute **effective loan days** `L = max(0, R − discountWindow)`.
    - If user sets *R* < discountWindow, snap back to `discountWindow` and show tooltip "Repayment cannot precede vendor payment".
- **Percent & day sliders**
    - Fixed small integer/decimal steps for fine control (0.1 %, 1 day) because absolute ranges are narrow.
- **Keyboard & fine‑tune affordance**
    - Arrow keys move 1 × step; Shift + Arrow moves 10 × step; users needing exact numbers can click value badge for direct edit.
- **Performance**
    - Debounce expensive computations to 50 ms so high‑frequency slider events don’t thrash React state.

### 5.2 Calculations (authoritative formulas) Calculations (authoritative formulas) Calculations (authoritative formulas) Calculations (authoritative formulas)

```
// constants (rate tiers served from backend)
RATE_TIERS = [                // simplified for code sample
  { revenue_max: 250000,  monthly_rate: 0.025  },
  { revenue_max: 1000000, monthly_rate: 0.0208 },
  { revenue_max: 10000000,monthly_rate: 0.0167 },
  { revenue_max: 50000000,monthly_rate: 0.015  }
]
ALT_RATES = {"Credit Card":0.245,"MCA":0.62,"Factoring":0.30}
DAYS_IN_MONTH = 30

// helper
def getPayLaterRate(monthlyRevenue):
    for tier in RATE_TIERS:
        if monthlyRevenue <= tier.revenue_max:
            return tier.monthly_rate
    return RATE_TIERS[-1].monthly_rate  // default to lowest rate

// user inputs
monthlyRevenue
supplierSpend
R  // repay day
discountWindow

monthlyRevenue
supplierSpend
R  // repay day
discountWindow

// derived values
paylaterMonthlyRate = getPayLaterRate(monthlyRevenue)
loanDays = max(0, R - discountWindow)
financingFactor = loanDays / DAYS_IN_MONTH
loanDays = max(0, R - discountWindow)
financingFactor = loanDays / DAYS_IN_MONTH               // fraction of a month financed

// 1. PayLater credit line (unlocked cash)
paylaterLine = monthlyRevenue * 0.25 * financingFactor

// 2. Spend eligible for financing
spendUsed = min(supplierSpend, paylaterLine)

// 3. Discount benefit (monthly)
benefit = spendUsed * discountRate

// 4. PayLater cost for actual loan duration
plCost = spendUsed * paylaterMonthlyRate * financingFactor

// 5. Normal Interest Rate (Monthly) – base PayLater headline rate
normalRateMonthly = paylaterMonthlyRate                // 1.40 %

// 6. Effective Interest Rate (Monthly) – net of early‑pay benefit
if financingFactor > 0:
    netRateMonthly = (plCost - benefit) / spendUsed / financingFactor
else:
    netRateMonthly = 0

// 7. Net annual savings
netSavingAnnual = = spendUsed * ( NormalMonthlyRate * FinancingFactor
                – NetRateMonthly * FinancingFactor ) * 12

// 8. Alternative product cost table (monthly‑normalized)
for (name, altRate) in ALT_RATES:
    altCostMonthly[name] = spendUsed * altRate * financingFactor   // cost for period
    altRateMonthly[name] = altRate                                // already monthly headline rate

```

Edge cases: if financingDays < discountWindow, set financingDays = discountWindow to prevent negative cost; if benefit ≤ plCost, highlight result in warning style.

### 5.3 Outputs (All Rates Shown as Monthly‑Normalized)

- **Unlocked Cash (PayLater Line)** – `paylaterLine` dollar‑formatted.
- **Normal Interest Rate (Monthly)** – `normalRateMonthly` (%) derived from rate tier.
- **Effective Interest Rate (Monthly)** – `netRateMonthly` (%) (net borrowing cost after discount, normalized to monthly).
- **Net Saving (Annual)** – `netSavingAnnual` dollar‑formatted.
- **Alternative product comparison** – table of `altRateMonthly` values.
- **Dynamic CTA state** – "Start Apply" enabled if `netSavingAnnual > 0`.
    
    (PayLater Line)** – `paylaterLine` dollar‑formatted.
    
- **Normal Interest Rate (Monthly)** – `normalRateMonthly` (%), fixed headline cost.
- **Effective Interest Rate (Monthly)** – `netRateMonthly` (%), true net borrowing cost after discount normalized to a full‑month basis (can be negative).
- **Net Saving (Annual)** – `netSavingAnnual` dollar‑formatted.
- **Alternative product comparison** – table of `altRateMonthly` values.
- **Dynamic CTA state** – "Start Apply" enabled if `netSavingAnnual > 0`.

### 6. UI / UX Requirements. UI / UX Requirements. UI / UX Requirements. UI / UX Requirements

- Follow layout rhythm of **aescape.com/roi** (hero headline, input panel left, results card right). Use Lendica brand colors (#0052CC primary, #00C389 accent).
- Animations: use count‑up effect for dollar figures; smooth slider for repayment day.
- Tooltips (i) explain each metric; icon set: Lucide‑react.
- Sticky CTA bar at bottom on mobile.

### Wireframes & Components

| Component | Library |
| --- | --- |
| Slider (universal numeric + currency) | `@/components/ui/slider` extended to show formatted value badges |
| Results Card | `Card` from shadcn/ui |
| PDF Button | `Button` variant="secondary" |

Designer must supply slider styling variants (currency, % , days) in Figma, including focus states and mobile friendly thumb size (≥44 px touch target).

### 7. Rate Tier Config (editable JSON served by backend). Rate Tier Config (editable JSON served by backend)

```json
[
  {"revenue_max":250000,"best_annual_rate":0.30,"best_monthly_rate":0.025},
  {"revenue_max":1000000,"best_annual_rate":0.25,"best_monthly_rate":0.0208},
  {"revenue_max":10000000,"best_annual_rate":0.20,"best_monthly_rate":0.0167},
  {"revenue_max":50000000,"best_annual_rate":0.18,"best_monthly_rate":0.015 }
]

```

Backend exposes `/v1/rates` returning the user’s tier based on `monthlyRevenue`.

### 8. API Contracts

| Method | Route | Req | Resp | Auth |
| --- | --- | --- | --- | --- |
| POST | `/v1/calc` | JSON inputs | calc outputs JSON | None |
| POST | `/v1/email-summary` | {email, inputs} | 202/400 | reCAPTCHA v3 |

Latency budget: < 150 ms @ p95.

### 9. Engineering Assets Needed

- **Design**: Figma, exported SVG icons, full style guide.
- **Copy**: Marketing‑approved microcopy & tooltip text in i18n JSON.
- **Config JSON**: rate‑tier table (see §7).
- **PDF Template**: Branded HTML/CSS or .docx for server‑side generation.
- **Env Vars**: `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET`, `SENDGRID_API_KEY`.
- **CI/CD Pipelines**: preview deployment to `/roi‑calculator` on merge.

### 10. Acceptance Criteria

1. Entering sample values from spec returns **Normal = 1.40 %, Effective ≈ 0.81 %, Net Saving ≈ $70,667**.
2. Crest test on Safari iOS 17 passes Lighthouse perf ≥ 90.
3. Summary email received within 60 s with matching figures and CTA link to onboarding.

### 11. Open Questions

- Are PayLater rates fixed or dynamic per borrower? (impacts backend cache TTL)
- Should alt‑product rates be editable by power‑users?
- CRM hook: which object to attach PDF to?

### 12. Representative Test Cases for Early‑Pay Profit Calculator

| **Scenario** | **Normal Interest Rate(Monthly)** | **Effective Interest Rate(Monthly)** | **Net Saving(Annual)** | **Unlocked Cash** |
| --- | --- | --- | --- | --- |
| Revenue = $200 kSpend = $100 kDiscount = 1 %Window = 10 dRepay = 60 d | **2.50 %** | **1.90 %** | **$10,000** | **$83,333** |
| Revenue = $2 MSpend = $1 MDiscount = 1 %Window = 10 dRepay = 60 d | **1.67 %** | **1.07 %** | **$100,000** | **$833,333** |
| Revenue = $10 MSpend = $5 MDiscount = 2 %Window = 15 dRepay = 45 d | **1.67 %** | **-0.33 %** | **$600,000** | **$2,500,000** |

**Notes**

- *Normal Interest Rate (Monthly)* is the PayLater headline rate returned from the tier table.
- *Effective Interest Rate (Monthly)* nets out the early-pay discount benefit for the actual financing period.
- A negative effective rate means the discount benefit exceeds the financing cost, making the financing accretive.
- *Net Saving (Annual)* = spend used × difference between normal and effective rates × loan-duration factor × 12.
- *Unlocked Cash* is the portion of monthly revenue converted into available credit for the specified loan period.