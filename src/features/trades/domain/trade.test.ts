import {describe,expect,it} from "vitest";
import {calculateTradePnl,type Trade} from "./trade";
const trade:Pick<Trade,"side"|"status"|"quantity"|"entryPrice"|"exitPrice"|"fees"|"funding">={side:"long",status:"closed",quantity:2,entryPrice:100,exitPrice:110,fees:1,funding:0};
describe("calculateTradePnl",()=>{
 it("calculates a profitable long after fees",()=>expect(calculateTradePnl(trade)).toEqual({grossPnl:20,netPnl:19,isClosed:true}));
 it("reverses the price move for shorts",()=>expect(calculateTradePnl({...trade,side:"short"})).toEqual({grossPnl:-20,netPnl:-21,isClosed:true}));
 it("does not realize PnL for open trades",()=>expect(calculateTradePnl({...trade,status:"open",exitPrice:null})).toEqual({grossPnl:null,netPnl:null,isClosed:false}));
});
