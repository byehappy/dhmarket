module.exports = class UserDto {
    email;
    id;
    activated;
    name;
    admin;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.activated = model.activated;
        this.name = model.name;
        this.admin = model.admin;
    }
}
