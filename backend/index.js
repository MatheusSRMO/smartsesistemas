import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import auctions from "./auctions.js";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}

const app = express();

app.use(
  cors(corsOptions)
);
app.use(express.json());

app.get("/", (req, res) => {
  try {
    const auctionsData = auctions.getAuctionsSafe();
    res.status(200).json(auctionsData);
  } catch (error) {
    console.error("Erro ao recuperar os leilões:", error);
    res.status(500).json({ error: "Erro ao recuperar os leilões" });
  }
});

// get auction by id
app.get("/auction/:id", (req, res) => {
  const { id } = req.params;
  const data = auctions.getAuctionsSafe()

  const auction = data.find((a) => a.id === id);
  if (!auction) {
    res.status(404).json({ error: "Leilão não encontrado." });
    return;
  }

  res.status(200).json(auction);
});

// Criar um novo leilão
app.post("/auction", (req, res) => {
  try {
    // pega o leilão da requisição
    const auctionData = req.body;

    console.log("Creating new auction:", auctionData);

    // Adiciona o leilão
    auctions.addAuction({
      ...auctionData,
      bids: [],
      timeLeft: 5 * 60,
      status: "open",
    });

    res.status(201).json(auctionData);
  } catch (error) {
    console.error("Erro ao criar leilão:", error);
    res.status(500).json({ error: "Erro ao criar leilão" });
  }
});

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Emite o tempo restante para o leilão
  socket.on("join-auction", ({ auctionId } ) => {
    console.log(`User ${socket.id} joined auction ${auctionId}`);
    const auction = auctions.getById(auctionId);
    if (!auction) {
      socket.emit("error", "Leilão não encontrado.");
      return;
    }

    console.log("Auction:", auction);

    // Se o leilão estiver aberto, emitimos o timer
    socket.emit("auction-curr", {
      auctionId: auction.id,
      time: auction.timeLeft,
      bids: auction.bids,
    });
  });

  socket.on("reset-auction-timer", ({ auctionId }) => {
    auctions.resetAuctionTimer(auctionId, 5*60);
    socket.emit("auction-curr", {
      auctionId,
      time: 5*60,
    });
  });

  // Receber um novo lance
  socket.on("place-bid", ({ auctionId, amount, userName }) => {
    console.log(`New bid on auction ${auctionId}: $${amount}`);

    const auction = auctions.getById(auctionId);
    if (!auction) {
      socket.emit("error", "Leilão não encontrado.");
      return;
    }

    if(auction.status === "closed") {
      socket.emit("erorr", "o Leilão está fechado!");
      return;
    }

    const lastBid = auction.bids.at(-1)?.amount || auction.bid;
    if (amount <= lastBid) {
      socket.emit("error", "O lance deve ser maior que o valor atual.");
      return;
    }

    // Adicionar o lance
    const bid = { userName, amount };
    auction.bids.push(bid);

    auctions.resetAuctionTimer(auctionId, 5*60);

    // Notificar todos os clientes de que houve um novo lance
    io.emit("new-bid", { auctionId, bid });
  });

  // Evento para solicitar lista de leilões
  socket.on("get-auctions", () => {
    socket.emit("auctions", getAuctionsSafe());
  });

  // Quando o usuário se desconectar
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Iniciar servidor na porta 3005
server.listen(3005, () => {
  console.log("Server running at http://localhost:3005");
});
