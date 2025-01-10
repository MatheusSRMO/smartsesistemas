import React from "react";

import LeilaoView from "./leilao.view";
import ClosedAuction from "./components/closed-auction";

export default async function AuctionPage({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;
  const url = process.env.API_URL  + id;

  console.log(url)

  const auction = await fetch(url).then((res) => res.json())

  if (auction.status === "closed") {
    return <ClosedAuction bids={auction.bids} />
  }

  return <LeilaoView id={id} auction={auction} />
}

