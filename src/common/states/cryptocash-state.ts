import { create } from "zustand"

type CryptoConversionState = {
  payToken: string
  receiveToken: string
  payWallet: string
  receiveWallet: string
  amount: string
  setConversion: (data: Partial<CryptoConversionState>) => void
}

export const useCryptoConversionStore = create<CryptoConversionState>((set) => ({
  payToken: "",
  receiveToken: "",
  payWallet: "",
  receiveWallet: "",
  amount: "",
  setConversion: (data) => set(data),
}))
