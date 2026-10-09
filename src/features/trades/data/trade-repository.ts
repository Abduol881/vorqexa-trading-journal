import type {Trade} from "../domain/trade";
import type {CreateTradeInput} from "../application/trade-input";
/** Persistence contract. Implementations must scope every operation to the verified user. */
export interface TradeRepository {
 listForUser(userId:string,limit?:number):Promise<Trade[]>;
 findForUser(userId:string,tradeId:string):Promise<Trade|null>;
 createForUser(userId:string,input:CreateTradeInput):Promise<Trade>;
 updateForUser(userId:string,tradeId:string,input:Partial<CreateTradeInput>):Promise<Trade|null>;
 deleteForUser(userId:string,tradeId:string):Promise<void>;
}
