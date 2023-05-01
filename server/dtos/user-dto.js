module.exports = class UserDto {
    email;
    id;
    activated;
    name;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.activated = model.activated;
        this.name = model.name;
    }
}
