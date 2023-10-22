import { AditionalInfo, Item, RoleItem, Thumbnail, TypeItem, Url } from "./common.interface";

export interface ComicInfo {
    creators: AditionalInfo<RoleItem>;
    stories: AditionalInfo<TypeItem>;
    characters: AditionalInfo<Item>;
    events: AditionalInfo<any>;
    variantDescription: string;
    textObjects: TextObject[];
    collectedIssues: any[];
    thumbnail: Thumbnail;
    issueNumber: number;
    resourceURI: string;
    description: string;
    diamondCode: string;
    images: Thumbnail[];
    collections: any[];
    digitalId: number;
    pageCount: number;
    modified: string;
    variants: any[];
    prices: Price[];
    format: string;
    series: Item;
    title: string;
    dates: Date[];
    isbn: string;
    issn: string;
    upc: string;
    ean: string;
    urls: Url[];
    id: number;
}

export interface Price {
    type: string;
    price: number;
}

export interface Date {
    type: string;
    date: string;
}

export interface TextObject {
    language: string;
    text: string;
    type: string;
}