import { Photo } from "./photo";

export class City {
    cityId!:number;
    name!:string;
    description!:string;
    userId!:number;
    photos!:Photo[];
    photoUrl!:string;
}
