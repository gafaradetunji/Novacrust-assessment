import { SelectTokenOption } from "../types";

export const TOKENS: SelectTokenOption[] = [
  {
    value: "usdtton",
    label: "USDT-TON",
    icon: "/usdt-ton.svg",
    price: 1.0,
  },
  {
    value: "usdtcelo",
    label: "USDT-CELO",
    icon: "/usdt-celo.svg",
    price: 1.0,
  },
  {
    value: "eth",
    label: "ETH",
    icon: "/eth.svg",
    price: 2000,
  },
  {
    value: "bnb",
    label: "USDT-BNB",
    icon: "/usdt-bnb.svg",
    price: 350,
  },
]

export const FIAT: SelectTokenOption[] = [
  {
    value: "ngn",
    label: "NGN",
    icon: "/ngn.svg",
    // price: 1 NGN in USD (approx). Adjust as needed.
    price: 0.0025,
  }
]

export const WalletList: SelectTokenOption[] = [
  {
    value: "metamask",
    label: "Metamask",
    icon: "/metamask.svg",
  },
  {
    value: "rainbow",
    label: "Rainbow",
    icon: "/rainbow.svg",
  },
  {
    value: "walletconnect",
    label: "Wallet Connect",
    icon: "/wallet-connect.svg",
  },
  {
    value: "others",
    label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
    icon: "/Wallet.svg",
  },
]

export const BankList: SelectTokenOption[] = [
  {
    value: "gtbank",
    label: "Guaranty Trust Bank (GTBank)",
    icon: '',
  },
  {
    value: "access",
    label: "Access Bank",
    icon: '',
  },
  {
    value: "uba",
    label: "United Bank for Africa (UBA)",
    icon: '',
  },
  {
    value: "zenith",
    label: "Zenith Bank",
    icon: '',
  },
  {
    value: "firstbank",
    label: "First Bank of Nigeria",
    icon: '',
  },
  {
    value: "opay",
    label: "OPay",
    icon: '',
  },
  {
    value: "kuda",
    label: "Kuda Bank",
    icon: '',
  },
  {
    value: "palmpay",
    label: "PalmPay",
    icon: '',
  },
  {
    value: "moniepoint",
    label: "Moniepoint",
    icon: '',
  },
]
