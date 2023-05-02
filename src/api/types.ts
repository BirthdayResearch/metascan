export interface WalletAddressToken {
  address: string;
  type: string;
  symbol: string;
  name: string;
  decimals: string;
  holders: string;
  exchange_rate: string;
  total_supply: string;
}

export interface PrivateTag {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface WatchlistName {
  display_name: string;
  label: string;
}

export interface PublicTag {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface WalletAddressInfoI {
  creator_address_hash: string;
  creation_tx_hash: string;
  token: WalletAddressToken;
  coin_balance: string;
  exchange_rate: string;
  implementation_address: string;
  block_number_balance_updated_at: number;
  hash: string;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  private_tags: PrivateTag[];
  watchlist_names: WatchlistName[];
  public_tags: PublicTag[];
  is_verified: boolean;
}

export interface WalletAddressCounterI {
  transactions_count: string;
  token_transfers_count: string;
  gas_usage_count: string;
  validations_count: string;
}
