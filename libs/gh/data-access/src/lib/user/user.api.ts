interface GraphQLType<T extends string = string> {
  __typename: T;
}

interface RateLimit extends GraphQLType {
  limit: number;
  remaining: number;
  cost: number;
}

interface PageInfo extends GraphQLType {
  hasNextPage: boolean;
  endCursor: string;
}

interface ItemsCount extends GraphQLType {
  totalCount: number;
}

export interface ApiUser extends GraphQLType<'User'> {
  name: string;
  avatarUrl: string;
  followers: ItemsCount;
  gists: ItemsCount;
}

interface ApiUserData extends GraphQLType {
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
