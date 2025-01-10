
// [{"id":"asdasda","image":"https://p4-ofp.static.pub//fes/cms/2024/12/26/684byy23hdctewcgbo7gc6n19mwmqv081864.png","title":"PRÉDIO COMERCIAL - PQ.","details":"28/01/2025 11:00","date":null,"time":null,"bid":200,"views":43017,"daysLeft":null,"type":"Prédio","location":"Campinas/SP","status":"open","bids":[]}]

export type Bid = {
    id: string
    amount: number
    time: Date
    userName: string
    userId: string
}

export type Auction = {
    id: string
    image: string
    title: string
    details: string
    date: string
    time: string
    bid: number
    views: number
    timeLeft: number
    type: string
    location: string
    bids: Bid[]
    status: "open" | "closed"
}