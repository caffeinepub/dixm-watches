import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface WatchProduct {
    id: bigint;
    collection: string;
    name: string;
    description: string;
    available: boolean;
    price: number;
    material: string;
}
export interface backendInterface {
    addProduct(name: string, collection: string, price: number, description: string, material: string, available: boolean): Promise<void>;
    addSeedDataAvantGarde(): Promise<void>;
    addSeedDataHeritage(): Promise<void>;
    addSeedDataPrecision(): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProducts(): Promise<Array<WatchProduct>>;
    getProductById(id: bigint): Promise<WatchProduct>;
    getProductsByCollection(collection: string): Promise<Array<WatchProduct>>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
}
