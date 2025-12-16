"use client"
import { Button, Input, PayWalletList, TitleAndBack } from "@/ui/modules/components"
import { BankList } from "@/common/data"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { verifyAccounts, BANK_ACCOUNTS } from "@/common/hooks"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const recipientSchema = Yup.object({
  bank: Yup.string().required("Bank is required"),
  accountNumber: Yup.string()
    .length(10, "Account number must be 10 digits")
    .required("Account number is required"),
  accountName: Yup.string(),
})

export function RecipientPage() {
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verifyError, setVerifyError] = useState("")
  const router = useRouter()

  async function verifyAccount({
    bank,
    accountNumber,
    onSuccess,
    onError,
  }: {
    bank: string
    accountNumber: string
    onSuccess: (name: string) => void
    onError: () => void
  }) {
    setLoading(true)
    setVerifyError("")
    setVerified(false)

    try {
      const name = await verifyAccounts({ bank, accountNumber })
      onSuccess(name)
      setVerified(true)
    } catch {
      onError()
      setVerifyError("Invalid account number for selected bank")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{
        bank: "",
        accountNumber: "",
        accountName: "",
      }}
      validationSchema={recipientSchema}
      validateOnMount
      onSubmit={(values) => {
        console.log("Recipient saved:", values)
        toast.success("Recipient saved")
        router.push("/")
      }}
    >
      {({
        values,
        setFieldValue,
        isValid,
        errors,
        touched,
      }) => (
        <Form
          className="flex w-full max-w-[640px] mx-auto flex-col gap-6 py-20 px-20"
        >
         <TitleAndBack title="Recipient details" />

          <PayWalletList
            title="Bank"
            options={BankList}
            value={values.bank}
            onChange={(v) => {
              setFieldValue("bank", v)
              setFieldValue("accountName", "")
              setVerified(false)
              setVerifyError("")
            }}
          />

          {values.bank && BANK_ACCOUNTS?.[values.bank] && Object.entries(BANK_ACCOUNTS[values.bank])[0] && (
            <div className="text-sm text-[#666]">
              <strong>Test account:</strong>{' '}
              {Object.entries(BANK_ACCOUNTS[values.bank])[0][0]} — {Object.entries(BANK_ACCOUNTS[values.bank])[0][1]}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <p className="font-medium text-[#013941]">
              Account number
            </p>

            <Input
              value={values.accountNumber}
              maxLength={10}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "")
                setFieldValue("accountNumber", val)
                setVerifyError("")
                setVerified(false)

                if (val.length === 10 && values.bank) {
                  verifyAccount({
                    bank: values.bank,
                    accountNumber: val,
                    onSuccess: (name) =>
                      setFieldValue("accountName", name),
                    onError: () =>
                      setFieldValue("accountName", ""),
                  })
                }
              }}
              isLoading={loading}
              isSuccess={verified}
              error={
                verifyError ||
                (touched.accountNumber ? errors.accountNumber : "")
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-[#013941]">
              Account name
            </p>

            <Input
              value={values.accountName}
              disabled
              isSuccess={verified}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid || loading || !verified}
          >
            Convert Now
          </Button>
        </Form>
      )}
    </Formik>
  )
}
