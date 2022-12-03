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

