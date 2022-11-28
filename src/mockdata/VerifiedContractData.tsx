export interface VerifiedContract {
  address: string;
  contractName: string;
  version: string;
  compiler: string;
  verifiedDate: string;
  status: VerifiedContractStatus;
}

export enum VerifiedContractStatus {
  Verified = "Verified",
  Unverified = "Unverified",
}

export const verifiedContracts: VerifiedContract[] = [
  {
    address: "1x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    address: "0x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
];

export const verifiedContractPages = [
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
