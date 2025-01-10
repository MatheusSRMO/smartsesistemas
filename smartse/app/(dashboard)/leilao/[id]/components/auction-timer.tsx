"use client";

import React from 'react';
import { motion } from "framer-motion";
import { formatTime } from '@/lib/utils';

interface AuctionTimerProps {
  auctionTime: number;
  progressKey: number;
}

export default function AuctionTimer({ auctionTime, progressKey }: AuctionTimerProps) {
  
  const width = `${Math.min((auctionTime / 300) * 100, 100)}%`
  
  return (
    <div>
      {/* Auction Timer Progress */}
      <div className="mt-4 bg-red-200 rounded-lg">
        <motion.div
          key={`${progressKey}-${auctionTime}`} // Atualiza a barra ao resetar o timer
          className="h-2 bg-red-600 rounded-lg"
          initial={{ width: width }}
          animate={{ width: "0%" }}
          transition={{ duration: auctionTime, ease: "linear" }}
        ></motion.div>
      </div>

      {/* Time to finish Auction */}
      <div className="mt-2 text-center text-gray-600">
        Tempo restante: <span className="font-semibold">{formatTime(auctionTime)}</span>
      </div>
    </div>
  )
}
