export class User {
  userId: string;
  email: string;
  profilePic: string;
  displayName: String;
}

export declare type Users = User[];

export class UserSearchResult {
  total: number;
  results: Users;
}
