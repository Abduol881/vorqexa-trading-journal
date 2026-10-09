export type TradeSide = "long" | "short";
export type TradeStatus = "open" | "closed";
export type TradeSource = "manual" | "csv" | "orderly";
export interface Trade {
  id:string; userId:string; instrument:string; marketType:"spot"|"perpetual"|"future"|"other";
  side:TradeSide; status:TradeStatus; quantity:number; entryPrice:number; exitPrice:number|null;
  fees:number; funding:number; stopLoss:number|null; takeProfit:number|null; openedAt:string; closedAt:string|null;
  setup:string|null; source:TradeSource; externalId:string|null; createdAt:string; updatedAt:string;
}
export interface TradePnl { grossPnl:number|null; netPnl:number|null; isClosed:boolean; }
export function calculateTradePnl(trade:Pick<Trade,"side"|"status"|"quantity"|"entryPrice"|"exitPrice"|"fees"|"funding">):TradePnl {
  if(trade.status!=="closed"||trade.exitPrice===null)return {grossPnl:null,netPnl:null,isClosed:false};
  const direction=trade.side==="long"?1:-1;
  const grossPnl=(trade.exitPrice-trade.entryPrice)*trade.quantity*direction;
  return {grossPnl,netPnl:grossPnl-trade.fees+trade.funding,isClosed:true};
}
