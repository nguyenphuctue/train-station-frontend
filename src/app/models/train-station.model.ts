import { Point, Polygon } from "ol/geom";

export interface TrainStation {
    id?: any,
    name?: string,
    address?: string,
    longitude?: number,
    latitude?: number,
    location?: any,
    distanceFromStart: number,
    distanceToEnd: number,
    note?: string,
    propertiesOfStation?: string,
    boundary?: Polygon

}