import { AditionalInfo, Item, Thumbnail, TypeItem, Url } from "./common.interface";

export interface CharacterInfo {
    stories: AditionalInfo<TypeItem>;
    comics: AditionalInfo<Item>;
    series: AditionalInfo<Item>;
    events: AditionalInfo<Item>;
    thumbnail: Thumbnail;
    resourceURI: string;
    description: string;
    modified: string;
    name: string;
    urls: Url[];
    id: number;
}

