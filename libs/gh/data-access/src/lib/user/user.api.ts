interface RateLimit {
  limit: number;
  remaining: number;
  cost: number;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface ItemsCount {
  totalCount: number;
}

interface ApiUser {
  name: string;
  followers: ItemsCount;
  gists: ItemsCount;
}

interface ApiUserData {
  userCount: number;
  pageInfo: PageInfo;
  nodes: ApiUser[];
}

export interface SearchUsersResult {
  rateLimit: RateLimit;
  search: ApiUserData;
}

export interface SearchUsersVariables {
  query: string;
  pageSize: number;
  after?: string;
}
