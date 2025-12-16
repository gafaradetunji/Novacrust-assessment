export interface SelectTokenOption {
  value: string
  label: string
  icon: string
  /**
   * Price expressed in USD for that token/fiat unit. Optional for wallets.
   */
  price?: number
}
