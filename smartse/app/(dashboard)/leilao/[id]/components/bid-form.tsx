"use client";

import React from 'react'
import { motion } from "framer-motion";

interface BidFormProps {
  newBid: string;
  setNewBidAction: (value: string) => void;
  isCooldown: boolean;
  handleBidAction: (userName: string) => void | Promise<void>;
}

export default function BidForm({ newBid, setNewBidAction, isCooldown, handleBidAction }: BidFormProps) {
  const [userName, setUserName] = React.useState("");
  const [isNameLocked, setIsNameLocked] = React.useState(false);
  
  // Estados para controlar o erro nos campos:
  const [nameError, setNameError] = React.useState(false);
  const [bidError, setBidError] = React.useState(false);

  /**
   * Atualiza o nome do usuário somente se ele ainda não estiver "travado".
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNameLocked) {
      setUserName(e.target.value);
    }
  };

  /**
   * Quando o campo de nome perde foco, se existir algo preenchido,
   * travamos para não permitir edição posterior.
   */
  const handleNameBlur = () => {
    if (userName.trim() !== "") {
      setIsNameLocked(true);
    }
  };

  /**
   * A ação interna que controla as validações de erro antes de chamar o handleBidAction real.
   */
  const handleInternalBidAction = async () => {
    // Reseta os estados de erro antes de cada tentativa:
    setNameError(false);
    setBidError(false);

    // Verifica se o nome está vazio:
    if (userName.trim() === "") {
      setNameError(true);
      return;
    }

    // Tenta enviar o lance. Se a função lançar exceção (ex.: lance menor que o mínimo),
    // marcamos o campo de lance como erro.
    try {
      await handleBidAction(userName);
    } catch (error) {
      setBidError(true);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800">Faça seu Lance</h2>
      <div className="mt-4">
        
        {/* Campo para o nome do usuário */}
        <input
          type="text"
          disabled={isNameLocked || isCooldown}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${nameError ? "border-red-500" : "border-gray-300"}
          `}
          placeholder="Digite seu nome"
          value={userName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />

        {/* Campo para o valor do lance */}
        <input
          type="number"
          className={`
            w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${bidError ? "border-red-500" : "border-gray-300"}
          `}
          placeholder="Digite o valor do lance"
          value={newBid}
          onChange={(e) => setNewBidAction(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isCooldown) {
              handleInternalBidAction();
            }
          }}
          disabled={isCooldown}
        />

        {
          bidError && <span className='text-red-500'>O valor deve ser maior que o lance atual!</span>
        }

        <div className="relative mt-4">
          <button
            className={`
              w-full font-medium py-2 rounded-lg transition-all duration-300
              ${isCooldown
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"}
            `}
            onClick={handleInternalBidAction}
            disabled={isCooldown}
          >
            {isCooldown ? "Aguarde..." : "Enviar Lance"}
            {isCooldown && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-blue-700 rounded-b-lg"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
