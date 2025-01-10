import React from 'react'


import AuctionCard from "@/components/auction-card"
import Image from 'next/image'
import { Auction } from '@/lib/types'


export default async function DashboardPage() {
  const auctions = await fetch("http://localhost:3005/").then((res) => res.json())
  return (
    <>
      {/* Banner principal */}
      <div className="relative w-full max-w-screen-lg mx-auto my-8 rounded-3xl overflow-hidden h-64">
        <Image
          src="/banner.webp"
          alt="Banner principal"
          className="w-full h-full object-cover"
          width={1200}
          height={400}
        />
        
      </div>

      <div className="container w-full max-w-screen-lg mx-auto px-4 py-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {auctions.slice().reverse().map((aut: Auction, index: number) => (
          <AuctionCard key={index} {...aut} views={aut.bids.length}/>
        ))}
      </div>

    </>
  )
}
