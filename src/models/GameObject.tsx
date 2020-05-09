import { v4 as uuid } from "uuid";

export class GameObject {
    constructor() {
        this.id = uuid();
    }

    private id: string;

    public toString = () => {
        return this.id;
    }

    // public clone = () => {
    //     // todo: is Object assing needed?
    //     return Object.assign({}, this);
    // }

}

export default GameObject;