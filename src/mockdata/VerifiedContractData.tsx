export interface VerifiedContract {
  contract: string;
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
    contract: "1x1c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x3c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x2c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x4c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x5c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x6c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x7c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x8c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x9c19380x0c19380x0c1938",
    contractName: "DRliveSey",
    version: "0.8.12",
    compiler: "Solidity",
    verifiedDate: "11/12/2023",
    status: VerifiedContractStatus.Verified,
  },
  {
    contract: "0x10c19380x0c19380x0c1938",
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
