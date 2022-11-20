export class User {
    constructor(
        public _id?: String,
        public email?: String,
        public contact_number?: String,
        public username?: String,
        public displayName?: String,
        public password?: String,
        public role?: String,   // can either be user /admin
    ) { }
}

