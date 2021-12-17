export class User {

    constructor( public username , public email , public employee , public image ) {
        //this.image = image.replace('localhost','159.223.28.104')
    }

    toJSON() {
        return JSON.stringify({...this})
    }
}
