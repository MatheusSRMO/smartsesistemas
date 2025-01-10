"use client";

import { Button } from '@/components/ui/button';
import { Bid } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti';


interface AuctionProps {
  bids: Bid[]
}

export default function ClosedAuction({ bids }: AuctionProps) {
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Obter as dimensões da janela para o efeito de confete
  useEffect(() => {
    setConfettiDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200 px-4">
      {bids.length > 0 && (
        <Confetti
          width={confettiDimensions.width}
          height={confettiDimensions.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <div className="w-full max-w-lg overflow-hidden">
        <div className="flex flex-col items-center p-6">
          <Image
            src={bids.length > 0 ? "/undraw_winners_fre4.svg": "/undraw_feeling-blue_8si6.svg"}
            alt="Ilustração de busca"
            width={800}
            height={800}
            className="w-96 h-96 mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
            Leilão encerrado
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-200 mb-6">
            Este leilão foi encerrado. Você pode conferir o resultado abaixo.
          </p>
          {bids.length > 0 && (
            <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
              <h3 className="text-gray-800 dark:text-gray-100 mb-2 text-xl font-bold">
                Vencedor
              </h3>
              <p className="font-semibold text-primary dark:text-gray-200 text-lg">
                {bids[bids.length - 1].userName}
              </p>
            </div>
          )}
          {
            bids.length === 0 && (
              <p className="text-center dark:text-gray-200 mb-6 font-bold text-primary">
                Nenhum lance foi dado neste leilão.
              </p>
            )
          }

          <Button className="w-full bg-primary text-white" asChild variant='link'>
            <Link href="/">
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
