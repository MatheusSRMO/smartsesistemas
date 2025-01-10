"use client";

import React from 'react'
import AuctionInformation from './components/auction-information'
import AuctionTimer from './components/auction-timer'
import ViewBids from './components/view-bids'
import BidForm from './components/bid-form'
import { useAuctionModel } from './leilao.model'
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import ClosedAuction from './components/closed-auction';
import { Auction } from '@/lib/types';

interface LeilaoViewProps {
  id: string;
  auction: Auction
}

export default function LeilaoView({ id, auction }: LeilaoViewProps) {

  const { auctionTime, progressKey, bids, newBid, setNewBid, isCooldown, handleBid,  } = useAuctionModel({
    auctionId: id,
    initialBids: [],
    basePrice: 100,
    minutes: -1,
  });

  if(auctionTime < 0) {
    return <div className='container flex justify-center items-center h-[85vh]'>
      <Loader />
    </div>
  }

  if(auctionTime === 0) {
    return <ClosedAuction bids={bids} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Auction Information */}
      <AuctionInformation auctionTime={auctionTime} title={auction.title} initialBid={auction.bid} details={auction.details} image={auction.image} />

      <AuctionTimer auctionTime={auctionTime} progressKey={progressKey} />

      {/* Bids Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Bids */}
        <ViewBids bids={bids} />

        {/* Bid Form */}
        <BidForm newBid={newBid} setNewBidAction={setNewBid} isCooldown={isCooldown} handleBidAction={handleBid} />

      </div>
    </div>
  )
}
