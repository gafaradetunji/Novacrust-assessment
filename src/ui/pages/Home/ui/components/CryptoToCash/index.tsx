"use client"

import { FIAT, TOKENS, WalletList } from "@/common/data"
import { useCryptoConversionStore } from "@/common/states"
import { Button, PaymentQouteComponent, PayWalletList } from "@/ui/modules/components"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import * as Yup from "yup"
import { useEffect, useRef, useState } from "react"

const schema = Yup.object({
  payToken: Yup.string().required(),
  receiveToken: Yup.string().required(),
  payWallet: Yup.string().required(),
  receiveWallet: Yup.string().required(),
})

export function CryptoToCash() {
  const setConversion = useCryptoConversionStore((s) => s.setConversion)
  const router = useRouter()
  const [localPayToken, setLocalPayToken] = useState("")
  const [localReceiveToken, setLocalReceiveToken] = useState("")
  const [payAmount, setPayAmount] = useState("1.00")
  const [receiveAmount, setReceiveAmount] = useState("1.00")
  const [isPriceLoading, setIsPriceLoading] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const jitterRef = useRef(1)

  function findPrice(value: string) {
    if (!value) return undefined
    const foundToken = TOKENS.find((t) => t.value === value)
    if (foundToken && typeof foundToken.price === "number") return foundToken.price
    const foundFiat = FIAT.find((f) => f.value === value)
    if (foundFiat && typeof foundFiat.price === "number") return foundFiat.price
    return undefined
  }

  function computeAmounts(payToken: string, receiveToken: string, amount = 1) {
    const payPrice = findPrice(payToken)
    const receivePrice = findPrice(receiveToken)

    if (!payPrice || !receivePrice) {
      setPayAmount(amount.toFixed(2))
      setReceiveAmount(amount.toFixed(2))
      return
    }

    const jitter = jitterRef.current
    const payPriceNow = payPrice * jitter
    const receivePriceNow = receivePrice * jitter

    const receiveQty = (amount * (payPriceNow / receivePriceNow)) || 0
    setPayAmount(amount.toFixed(2))
    setReceiveAmount(receiveQty.toFixed(2))
  }

  useEffect(() => {
    if (!localPayToken || !localReceiveToken) {
        setPayAmount("0.00")
        setReceiveAmount("0.00")
        setIsPriceLoading(false)
        return
    }

    setIsPriceLoading(true)
    jitterRef.current = 1
    computeAmounts(localPayToken, localReceiveToken, 1)

    const interval = setInterval(() => {
        const delta = 1 + (Math.random() * 0.01 - 0.005)
        jitterRef.current = delta
        computeAmounts(localPayToken, localReceiveToken, 1)
    }, 1000)

    // Optional initial delay
    const timeout = setTimeout(() => {
        setIsPriceLoading(false)
    }, 1500)

    return () => {
        clearInterval(interval)
        clearTimeout(timeout)
    }
  }, [localPayToken, localReceiveToken])



  return (
    <Formik
      initialValues={{
        payToken: "",
        receiveToken: "",
        payWallet: "",
        receiveWallet: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        if (!values.payToken || !values.receiveToken || !values.payWallet || !values.receiveWallet) {
          toast.warning('Please select all fields')
          return
        }

        toast.loading('Converting...')
        setIsConverting(true)
        setIsPriceLoading(true)

        setTimeout(() => {
          setConversion(values)
          console.log("Saved to zustand:", values)
          setIsConverting(false)
          setIsPriceLoading(false)
          toast.dismiss()
          router.push("/recipient")
        }, 3000)
      }}
    >
      {({ values, setFieldValue, isValid }) => (
        <Form
          className="flex flex-col gap-y-6"
        >
          <PaymentQouteComponent
            text="You pay"
            icon={null as any}
            amount={payAmount}
            options={TOKENS}
            value={values.payToken}
            onChange={(v) => {
              setFieldValue("payToken", v)
              setLocalPayToken(v)
            }}
            isLoading={isPriceLoading}
          />

          <PaymentQouteComponent
            text="You receive"
            icon={null as any}
            amount={receiveAmount}
            options={FIAT}
            value={values.receiveToken}
            onChange={(v) => {
              setFieldValue("receiveToken", v)
              setLocalReceiveToken(v)
            }}
            isLoading={isPriceLoading}
          />

          <PayWalletList
            title="Pay from"
            options={WalletList}
            value={values.payWallet}
            onChange={(v) => setFieldValue("payWallet", v)}
          />

          <PayWalletList
            title="Pay to"
            options={FIAT}
            value={values.receiveWallet}
            onChange={(v) => setFieldValue("receiveWallet", v)}
          />

          <Button type="submit" disabled={!isValid || isConverting}>
            {isConverting ? "Converting..." : "Convert Now"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
