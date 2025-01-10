import { FaEye, FaHeart, FaShareAlt } from "react-icons/fa";

interface AuctionCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  bid: number;
  views: number;
  status: "open" | "closed";
  timeLeft: number;
  type: string;
  details: string;
}

const AuctionCard = ({ id, image, title, location, date, time, bid, views, timeLeft, type, details, status }: AuctionCardProps) => (
  <a href={`/leilao/${id}`} className="max-w-xs w-full min-w-54 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
    {/* Image and Actions */}
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaShareAlt size={16} />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaHeart size={16} />
        </button>
      </div>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
        <FaEye className="inline-block mr-1" />
        {views}
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
      <p className="text-sm text-gray-500 truncate">{details}</p>
      <div className="text-sm text-gray-500 mt-2">
        <p>
          {
            status == "open" && (
              <>
                <span className="font-semibold text-green-500">Aberto: </span> {date}
              </>
            )
          }
          {
            status == "closed" && (
              <span className="font-semibold text-red-500">Encerrado</span>
            )
          }
        </p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-primary font-bold text-lg">
          {bid.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex justify-between text-sm text-gray-600">
      <span>{type}</span>
      <span>{location}</span>
    </div>
  </a>
);

export default AuctionCard;