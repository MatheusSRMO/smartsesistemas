import bcrypt from "bcryptjs";

// Função para gerar um ID único
function generateUniqueId(title) {
  // Gera o hash a partir do título
  const hash = bcrypt.hashSync(title, 4);

  // Normaliza o hash: remove caracteres especiais e substitui por 'a'
  const id = hash
    .slice(7, 21) // Seleciona uma substring do hash
    .replace(/[^a-zA-Z0-9]/g, 'a') // Remove caracteres não alfanuméricos, substituindo por 'a'

  return id;
}

class AuctionManager {
  constructor(auctions) {
    this.auctions = auctions.map((auction) => ({
      ...auction,
      timeLeft: null, // Tempo restante inicializado como null
      timer: null,   // Referência ao timer do setInterval
    }));

    // Inicia os timers para os leilões existentes
    this.auctions.forEach((auction) => {
      if (auction.status === "open") {
        this.startAuctionTimer(auction.id, 5*60);
      }
    });
  }

  // Inicia o timer para um leilão específico
  startAuctionTimer(auctionId, durationInSeconds) {
    const auction = this.getById(auctionId);
    if (!auction) throw new Error("Leilão não encontrado.");

    auction.timeLeft = durationInSeconds;

    if (auction.timer) clearInterval(auction.timer); // Limpa timer antigo, se existir

    auction.timer = setInterval(() => {
      if (auction.timeLeft > 0) {
        auction.timeLeft -= 1; // Decrementa o tempo restante
      } else {
        this.closeAuction(auctionId); // Encerra o leilão quando o tempo acaba
      }
    }, 1000); // Executa a cada segundo
  }

  // Encerra um leilão manualmente ou automaticamente
  closeAuction(auctionId) {
    const auction = this.getById(auctionId);
    if (!auction) throw new Error("Leilão não encontrado.");

    auction.status = "closed";
    auction.timeLeft = 0;

    if (auction.timer) {
      clearInterval(auction.timer); // Limpa o timer
      auction.timer = null;
    }

    console.log(`Leilão ${auctionId} encerrado.`);
  }

  // Retorna uma lista dos leilões sem incluir as referências dos timers
  getAuctionsSafe() {
    return this.auctions.map(({ timer, ...auction }) => auction);
  }

  // Reinicia o tempo de um leilão (por exemplo, após novo lance)
  resetAuctionTimer(auctionId, newDurationInSeconds) {
    this.startAuctionTimer(auctionId, newDurationInSeconds);
  }

  // Adiciona um novo leilão à lista
  addAuction(newAuction) {

    const id = generateUniqueId(newAuction.title);

    this.auctions.push({
      id,
      ...newAuction,
      timeLeft: null,
      timer: null,
    });

    console.log(`Leilão ${id} adicionado.`);
    this.startAuctionTimer(id, 5 * 60);
  }

  // Remove um leilão da lista
  removeAuction(auctionId) {
    const auctionIndex = this.auctions.findIndex((a) => a.id === auctionId);
    if (auctionIndex === -1) throw new Error("Leilão não encontrado.");

    const auction = this.auctions[auctionIndex];

    if (auction.timer) {
      clearInterval(auction.timer); // Limpa o timer, se existir
    }

    this.auctions.splice(auctionIndex, 1);
  }

  getById(auctionId) {
    return this.auctions.find((a) => a.id === auctionId);
  }
}
  
// Exemplo de uso
export const data = [
  {
    id: "asdasda",
    image: "https://p4-ofp.static.pub//fes/cms/2024/12/26/684byy23hdctewcgbo7gc6n19mwmqv081864.png",
    title: "PRÉDIO COMERCIAL - PQ.",
    details: "28/01/2025 11:00",
    deadline : "28/01/2025 11:00",
    bid: 200,
    timeLeft: 5 * 60, // 5 minutos
    status: "open",
    bids: [],
  },
  {
    id: "asdasd1",
    image: "https://p4-ofp.static.pub//fes/cms/2024/12/26/684byy23hdctewcgbo7gc6n19mwmqv081864.png",
    title: "PRÉDIO COMERCIAL - PQ.",
    details: "28/01/2025 11:00",
    deadline : "28/01/2025 11:00",
    bid: 200,
    timeLeft: 5 * 60, // 5 minutos
    status: "open",
    bids: [],
  },
];

export default new AuctionManager(data);