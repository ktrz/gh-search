export class User {
  constructor(public readonly name: string,
              public readonly avatarUrl: string,
              public readonly followersCount: number,
              public readonly gistsCount: number) {}
}
