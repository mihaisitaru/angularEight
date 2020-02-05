export class User {
    constructor(
        public email: string,
        public id: string,
        private tokenPrivate: string,
        private tokenExpirationDate: Date
        ) {}

        get token() {
            if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
                return null;
            }
            return this.tokenPrivate;
        }
}
