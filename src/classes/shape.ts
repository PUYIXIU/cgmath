import { type Point } from "./point";

export abstract class Shape {

    abstract get vertices(): Point[]
    
    abstract clone(): Shape

    abstract equalTo(iShape: Shape): boolean

    abstract toString(): string

    abstract toJson(): object
}