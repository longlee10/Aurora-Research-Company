/*******************************
File Name: user.model.ts
Description: Defines the user model
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

export class User {
    constructor(
        public _id?: string,
        public email?: string,
        public contact_number?: string,
        public username?: string,
        public displayName?: string,
        public password?: string,
        public role?: string,   // can either be user /admin
        public isActive?: boolean
    ) { }
}

