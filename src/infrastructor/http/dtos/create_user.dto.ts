

export class CreateUserDto {
    constructor(
        public id: string,
        public name: string,
        public email: string,
    ) { }
}