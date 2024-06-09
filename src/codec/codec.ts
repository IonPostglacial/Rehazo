import { Field, CharacterPreset, CharacterType } from "../datatypes/types";


export type AnyEncodedDocument = {
	type: string;
	id: string;
	path: string[];
};

export type EncodedBook = AnyEncodedDocument & {
	type: "book";
    label: string;
};

export type EncodedPicture = AnyEncodedDocument & {
	type: "picture";
	url: string;
	label: string;
	hubUrl: string|undefined;
};

export type EncodedBookInfo = AnyEncodedDocument & {
	type: "bookinfo";
    fasc: string;
    page: string;
    detail: string;
};

export type EncodedState = AnyEncodedDocument & {
	name: string;
	nameEN: string;
	nameCN: string;
	photos: EncodedPicture[];
	description?: string;
	color?: string;
};

type EncodedHierarchicalItem = AnyEncodedDocument & {
	type: "character" | "taxon",
    parentId?: string,
    topLevel: boolean,
    children: string[],
    name: string,
    nameEN?: string,
    nameCN?: string,
    photos: EncodedPicture[],
    vernacularName?: string,
}

export type EncodedCharacter = EncodedHierarchicalItem & { 
	photos: string[]|EncodedPicture[],
	preset?: CharacterPreset,
	mapFile?: string,
	min?: number,
	max?: number,
	unit?: string,
    states: string[],
    characterType: CharacterType,
    color?: string,
    detail: string,
    inherentStateId?: string,
    inapplicableStatesIds: string[],
    requiredStatesIds: string[],
};

type EncodedDescription = { descriptorId: string, statesIds: string[] };

export type EncodedTaxon = EncodedHierarchicalItem & {
    bookInfoByIds?: Record<string, EncodedBookInfo>,
    specimenLocations?: { lat: number; lng: number; }[],
    descriptions : EncodedDescription[],
    measurements?: { min: number, max: number, character: string }[],
    author: string,
    vernacularName2?: string,
    name2?: string,
    meaning: string,
    herbariumPicture: string,
    website: string,
    noHerbier?: string,
    fasc: string,
    page: string,
    detail: string,
	extra?: any,
};

export interface EncodedDataset {
	version?: number,
	id: string
	taxons: EncodedTaxon[];
	characters: EncodedCharacter[];
	states: EncodedState[];
	books: EncodedBook[];
	extraFields?: Field[];
}
