import { formatTime } from '@/lib/utils'
import React from 'react'

interface AuctionInformationProps {
  auctionTime: number,
  title: string,
  initialBid: number,
  details: string
  image: string
}

export default function AuctionInformation({ auctionTime, title, initialBid, details, image }: AuctionInformationProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={image}
        alt="Leilão"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>
        <p className="text-gray-600 mt-2">
          Encerramento: <span className="font-semibold">{formatTime(auctionTime)}</span>
        </p>
        <p className="text-gray-600 mt-1">
          Lance Inicial: <span className="font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(initialBid)}
          </span>
        </p>
        <p className="text-gray-600 mt-1">
          Detalhes: <span className="font-semibold">{details}</span>
        </p>
      </div>
    </div>
  )
}
