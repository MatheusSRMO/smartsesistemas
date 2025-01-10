import { Bid } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const URL = "http://localhost:3005";


const socket = io(URL, {
  autoConnect: true,
});

interface AuctionModelProps {
  auctionId: string;
  initialBids: Bid[];
  basePrice: number;
  minutes: number;
}

export function useAuctionModel({
  auctionId,
  initialBids,
  basePrice,
  minutes,
}: AuctionModelProps) {
  const [bids, setBids] = useState(initialBids);
  const [newBid, setNewBid] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(5);
  const [auctionTime, setAuctionTime] = useState(60 * minutes );
  const [progressKey, setProgressKey] = useState(0);
  const [auctionStatus, setAuctionStatus] = useState<"open" | "closed">("open");

  const auctionInterval = useRef<null | NodeJS.Timeout>(null);

  const handleBid = (userName: string) => {
    const bidAmount = parseFloat(newBid);
    const lastBid = bids.at(-1)?.amount || basePrice;
  
    if (!newBid || isNaN(bidAmount) || bidAmount <= lastBid) {
      throw new Error("O valor do lance deve ser maior que o valor atual.");
    }

    console.log("Emitting bid", { auctionId, userName, amount: bidAmount });
  
    socket.emit("place-bid", { auctionId, userName, amount: bidAmount });
    setIsCooldown(true);
    setCooldownTime(5);
    setNewBid("");
  };

  useEffect(() => {


    socket.emit("join-auction", { auctionId: auctionId });

    socket.on("auction-curr", ({ auctionId: id, time, bids }: { auctionId: string; time: number, bids: Bid[] }) => {
      console.log("Received auction-curr", { id, time });

      resetAuctionTimer({ time });
      setBids(bids);

      if(time === 0) {
        setAuctionStatus("closed");
      }
    });

    socket.on("reset-auction-timer", ({ auctionId: id, time }: { auctionId: string, time: number }) => {
      if (id === auctionId) {
        resetAuctionTimer({ time });
      }
    });

    socket.on("new-bid", ({ auctionId: id, bid }: { auctionId: string; bid: Bid }) => {
      if (id === auctionId) {
        setBids((prev) => [...prev, bid]);
        resetAuctionTimer({ time: 60 * 5 });
      }
    });

    socket.on("auction-closed", ({ auctionId: id }: { auctionId: string }) => {
      if (id === auctionId) {
        setAuctionStatus("closed");
      }
    });

    return () => {
      socket.off("new-bid");
      socket.off("auction-closed");
      socket.off("auction-curr");
    };
  }, [auctionId]);

  const resetAuctionTimer = ({ time }: { time: number }) => {
    setAuctionTime(time);
    setProgressKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (isCooldown) {
      const cooldownInterval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            setIsCooldown(false);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(cooldownInterval);
    }
  }, [isCooldown]);

  useEffect(() => {
    if (auctionTime > 0) {
      auctionInterval.current = setInterval(() => {
        setAuctionTime((prev) => prev - 1);
      }, 1000);
    } else if (auctionStatus === "open") {
      socket.emit("close-auction", { auctionId });
    }

    return () => {
      if (auctionInterval.current !== null) clearInterval(auctionInterval.current);
    };
  }, [auctionTime, auctionStatus, auctionId]);

  useEffect(() => {
    socket.on("error", (message: string) => {
      alert(message);
    });

    return () => {
      socket.off("error");
    };
  }, []);

  return {
    bids,
    newBid,
    isCooldown,
    cooldownTime,
    auctionTime,
    progressKey,
    auctionStatus,
    setNewBid,
    handleBid,
  };
}
