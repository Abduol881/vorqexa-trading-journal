import {calculateTradePnl,type Trade} from "@/features/trades/domain/trade";
export interface PerformanceSummary{closedTrades:number;winners:number;losers:number;winRate:number|null;netPnl:number;averageNetPnl:number|null}
export function summarizePerformance(trades:Trade[]):PerformanceSummary{
 const values=trades.map(t=>calculateTradePnl(t)).filter(p=>p.isClosed&&p.netPnl!==null).map(p=>p.netPnl as number);
 const winners=values.filter(v=>v>0).length,losers=values.filter(v=>v<0).length,netPnl=values.reduce((sum,v)=>sum+v,0);
 return {closedTrades:values.length,winners,losers,winRate:values.length?winners/values.length*100:null,netPnl,averageNetPnl:values.length?netPnl/values.length:null};
}
