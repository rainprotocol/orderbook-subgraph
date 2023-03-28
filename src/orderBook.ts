import { OrderBook } from "../generated/schema";
import { Initialized } from "../generated/OrderBook/OrderBook"

export function handleInitialized(event: Initialized): void {
    let orderBook = new OrderBook(event.address);
    orderBook.deployer = event.transaction.from;
    orderBook.save();
}