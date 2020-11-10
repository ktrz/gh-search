export class User {
  public readonly apiUrl = `https://api.github.com/users/${this.login}`;

  constructor(
    public readonly login: string,
    public readonly name: string,
    public readonly avatarUrl: string,
    public readonly followersCount: number,
    public readonly gistsCount: number,
    public readonly url: string,
    public readonly projectsUrl: string,
    public readonly websiteUrl: string,
    public readonly bio: string,
    public readonly location: string
  ) {}
}
