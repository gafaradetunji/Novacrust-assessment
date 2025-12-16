# Novacrust Test (Next.js)

Short README focused on setup, how to run the app locally, and a brief explanation of the conversion flow implemented in this project.

## Requirements

- Node.js >= 18
- A package manager: `pnpm`, `npm` or `yarn` (examples below use `pnpm`/`npm` interchangeably)

## Setup

1. Install dependencies

```bash
pnpm install
# or
npm install
```

2. Run the dev server

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

## Available scripts

- `dev` – start Next.js in development mode
- `build` – build production assets
- `start` – run production server (after `build`)
- `lint` – run ESLint

Use the package.json scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`.

## Quick project overview (what I changed / where to look)

- `src/common/data/token-array.ts` — token lists (`TOKENS`, `FIAT`, `WalletList`, `BankList`). Token/fiat entries include a `price` field (USD-based) used for conversion math. Edit these values to change base prices.
- `src/common/types/token-options.ts` — `SelectTokenOption` now has an optional `price?: number` field.
- `src/common/hooks/verify-account.ts` — contains `BANK_ACCOUNTS` test data and `useVerifyAccount` mock that simulates account verification (1.5s delay). Add or edit test accounts here.
- `src/ui/pages/Home/ui/components/CryptoToCash/index.tsx` — conversion UI: selects pay/receive tokens, shows computed equivalent amounts using the `price` fields, simulates small realtime price jitter, shows a skeleton loader while prices are updating, and simulates a 3s conversion delay before routing to `/recipient`.
- `src/ui/pages/RecipientPage/index.tsx` — recipient form that verifies account numbers using `useVerifyAccount`. The page shows a test account for the selected bank to make testing easier; on successful submit it shows a success toast and routes back to `/`.
- `src/ui/modules/components/paymentQouteComponent/index.tsx` — accepts an `isLoading` prop and displays the `Skeleton` loader for amount when `isLoading` is true.

## Testing the conversion + recipient flow locally

1. Open the home page and go to the Convert flow (Crypto to Cash component). Select a pay token (e.g., `ETH`) and a receive currency (e.g., `NGN`). You should see the estimated receive amount update (with small jitter).
2. Click Convert — this simulates a 3-second conversion. After the delay you'll be routed to `/recipient`.
3. On the Recipient page, select a bank. A small "Test account" hint shows a valid 10-digit account number from `BANK_ACCOUNTS`. Use that account number to trigger the verification (simulated 1.5s). After verification the account name will fill and the submit button is enabled.
4. Submitting shows a success toast and routes back home.

## Important assumptions & trade-offs

- Price simulation: This project uses a simple in-memory `price` field (USD) on token/fiat entries and a tiny random jitter to simulate realtime price changes. Trade-off: no external API usage, predictable/simple behavior. If you want live prices, replace the jitter with periodic fetches to a price API and update the `price` fields dynamically.
- Verification: `useVerifyAccount` and `BANK_ACCOUNTS` are mocked in `src/common/hooks/verify-account.ts`. It's intentionally simulated (timeout) for demo/testing.
- UX: A transient ref window (`loadingUntilRef`) drives skeleton visibility. This is an intentional design choice to keep UI responsive.
- Types: `SelectTokenOption.price` is optional to avoid breaking wallet entries that don't need prices. Wallet entries in `WalletList` intentionally omit `price`.

## Where to change values for testing

- Edit token / fiat prices: `src/common/data/token-array.ts` — adjust `price` numbers.
- Edit mock bank accounts: `src/common/hooks/verify-account.ts` — add entries to `BANK_ACCOUNTS`.
