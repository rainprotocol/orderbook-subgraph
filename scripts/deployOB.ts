import { deployOrderBook } from "../utils/deploy/orderBook/deploy";

const main = async () => {
    await deployOrderBook()
}

main()
  .then(() => {
    const exit = process.exit;
    exit(0);
  })
  .catch((error) => {
    console.error(error);
    const exit = process.exit;
    exit(1);
  });
