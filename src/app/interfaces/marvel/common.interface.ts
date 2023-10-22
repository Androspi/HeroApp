export interface MarvelResponse<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
}

export interface AditionalInfo<T> {
    collectionURI: string;
    available: number;
    returned: number;
    items: T[];
}

export interface Item {
    resourceURI: string;
    name: string;
}

export interface TypeItem extends Item {
    type: string;
}

export interface RoleItem extends Item {
    role: string;
}

export interface Thumbnail {
    extension: string;
    path: string;
}

export interface Url {
    type: string;
    url: string;
}

