import {z} from "zod";
export const createTradeSchema=z.object({
 instrument:z.string().trim().min(1).max(40),marketType:z.enum(["spot","perpetual","future","other"]),
 side:z.enum(["long","short"]),status:z.enum(["open","closed"]),quantity:z.number().positive().finite(),
 entryPrice:z.number().positive().finite(),exitPrice:z.number().positive().finite().nullable().optional(),
 fees:z.number().nonnegative().finite().default(0),funding:z.number().finite().default(0),
 stopLoss:z.number().positive().finite().nullable().optional(),takeProfit:z.number().positive().finite().nullable().optional(),
 openedAt:z.iso.datetime(),closedAt:z.iso.datetime().nullable().optional(),setup:z.string().trim().max(3000).nullable().optional()
});
export type CreateTradeInput=z.infer<typeof createTradeSchema>;
