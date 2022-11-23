

export class User {
    name = ''
    email = ''
    id = ''
    destino = ''
    tipo = ''
    precio = 0


    constructor(name, email, id, destino, tipo, precio) {
        this.name = name
        this.email = email
        this.id = id
        this.destino = destino
        this.tipo = tipo
        this.precio = precio
    }
}