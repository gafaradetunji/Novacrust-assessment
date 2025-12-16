export const BANK_ACCOUNTS: Record<
  string,
  Record<string, string>
> = {
  gtbank: {
    "0123456789": "John Doe",
  },
  access: {
    "1111111111": "Jane Smith",
  },
  uba: {
    "2222222222": "Michael Johnson",
  },
  zenith: {
    "3333333333": "Sarah Williams",
  },
  firstbank: {
    "4444444444": "David Brown",
  },
}

export function verifyAccounts({
  bank,
  accountNumber,
}: {
  bank: string
  accountNumber: string
}): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const name = BANK_ACCOUNTS?.[bank]?.[accountNumber]
      if (!name) reject("Invalid account details")
      resolve(name)
    }, 1500)
  })
}
