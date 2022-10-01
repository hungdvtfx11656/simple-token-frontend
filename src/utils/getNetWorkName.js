export default function getNetWorkName(netId) {
  switch (netId) {
    case "1":
      return "Mainnet";
    case "2":
      return "Morden test network";
    case "3":
      return "Ropsten network";
    case "4":
      return "Rinkeby test network";
    case "42":
      return "Kovan test network";
    case "1337":
      return "localhost:8545";
    default:
      return "Unknown network";
  }
}
