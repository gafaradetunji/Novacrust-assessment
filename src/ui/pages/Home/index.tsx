'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/modules/components";
import { CryptoToCash } from "./ui/components";

export function HomePage() {
  return (
    <div className="flex w-full max-w-[640px] mx-auto flex-col gap-6 py-20 px-20">
      <Tabs defaultValue="crypto-to-cash">
        <TabsList>
          <TabsTrigger value="crypto-to-cash">Crypto to cash</TabsTrigger>
          <TabsTrigger value="cash-to-crypto">Cash to crypto</TabsTrigger>
          <TabsTrigger value="fiat-loan">Crypto to fiat loan</TabsTrigger>
        </TabsList>
        <TabsContent value="crypto-to-cash">
         <CryptoToCash />
        </TabsContent>
        <TabsContent value="cash-to-crypto">
            <div>Cash to crypto</div>
        </TabsContent>
        <TabsContent value="fiat-loan">
            <div>Crypto to fiat loan</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
