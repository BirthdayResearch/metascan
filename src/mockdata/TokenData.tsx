export interface Token {
  asset: string;
  type: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
  contractAddress: string;
}

export const tokens: Token[] = [
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x1c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x2c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x3c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x4c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x5c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x6c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x7c19380x0c19380x0c1938",
  },
  {
    asset: "Ethereum",
    type: "ERC 20",
    symbol: "Eth",
    amount: 0.00002131,
    price: 1234.23,
    value: 45.45,
    contractAddress: "0x8c19380x0c19380x0c1938",
  },
];

export const tokenPages = [
  {
    n: 1,
    active: true,
    cursors: [],
  },
  {
    n: 2,
    active: false,
    cursors: ["1"],
  },
  {
    n: 3,
    active: false,
    cursors: ["1", "2"],
  },
];
