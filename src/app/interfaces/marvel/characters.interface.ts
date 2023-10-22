export interface CharacterResponse {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: CharacterInfo[];
}

export interface CharacterInfo {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: AditionalInfo;
    series: AditionalInfo;
    stories: AditionalInfo;
    events: AditionalInfo;
    urls: Url[];
}

export interface Url {
    type: string;
    url: string;
}

export interface AditionalInfo {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Item {
    resourceURI: string;
    name: string;
    type?: string;
}

export interface Thumbnail {
    path: string;
    extension: string;
}