import { Bid } from '@/lib/types'
import React from 'react'

interface ViewBidsProps {
  bids: Bid[]
}

export default function ViewBids({ bids }: ViewBidsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800">Lances</h2>
      <div className="mt-4 h-64 overflow-y-auto">
        {bids.slice().reverse().map((bid, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 border-b border-gray-200 ${
              index === 0 ? "bg-green-50 " : ""
            }`}
          >
            <span className="text-gray-800 font-medium">{bid.userName}</span>
            <span className="text-blue-600 font-bold">R$ {bid.amount.toLocaleString("pt-BR")}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
