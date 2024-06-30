import Months from "../datatypes/Months";
import { standardMaps, standardUnits } from "../datatypes/stdcontent";
import { EncodedDataset } from "./codec";
import { DataStore } from "./storage";

export function loadToDatabase(ds: EncodedDataset, db: DataStore) {
    let order = 0;
    for (const [ref, unit] of Object.entries(standardUnits)) {
        db.addRow("units", [ref, unit.base?.unit.name.S ?? "", `${unit.base?.factor ?? ""}`]);
    }
    const CALENDAR_ID = "_cal";
    db.addRow("documents", { ref: CALENDAR_ID, path: "", order, name: "Calendar", details: "Gregorian calendar" });
    order++;
    for (let i = 0; i < Months.NAMES.length; i++) {
        const month = Months.NAMES[i];
        db.addRow("documents", { ref: `_cal_${month}`, path: CALENDAR_ID, order: i, name: `${month}`, details: "" });
    }
    const ROOT_PLACE_ID = "_geo";
    db.addRow("documents", { ref: ROOT_PLACE_ID, path: "", order, name: "Geographical Places", details: "All geographical places" });
    order++;
    const MADA_PLACE_ID = "_geo_mada";
    db.addRow("documents", { ref: MADA_PLACE_ID, path: ROOT_PLACE_ID, order, name: "Madagascar", details: "The island of Madagascar" });
    db.addRow("geographical_places", [MADA_PLACE_ID, "-18.546564", "46.518367", "2000"]);
    const mapsRefByFileName = new Map<string, string>();
    for (const [i, map] of standardMaps.entries()) {
        order++;
        const DOC_ID = `_geo_mada_${i+1}`;
        db.addRow("documents", { ref: DOC_ID, path: MADA_PLACE_ID, order: i, name: map.name, details: "The island of Madagascar" });
        db.addRow("geographical_maps", [DOC_ID, MADA_PLACE_ID, map.fileName, map.property]);
        mapsRefByFileName.set(map.fileName, DOC_ID);
    }
    for (const book of ds.books) {
        order++;
        db.addRow("documents", { ref: book.id, path: book.path.join("."), order, name: book.label, details: "" });
        db.addRow("books", [book.id, ""]);
    }
    for (const character of ds.characters) {
        order++;
        db.addRow("documents", { ref: character.id, path: character.path.join("."), order, name: character.name, details: character.detail });
        if (character.nameCN) {
            db.addRow("document_translations", [character.id, "CN", character.nameCN, ""]);
        }
        if (character.nameEN) {
            db.addRow("document_translations", [character.id, "EN", character.nameEN, ""]);
        }
        for (const [index, pic] of character.photos.entries()) {
            order++;
            db.addRow("document_attachments", [character.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
        }
        if (character.characterType === "discrete") {
            switch (character.preset) {
            case "flowering":
                db.addRow("periodic_characters", [character.id, CALENDAR_ID, character.color ?? ""]);
                break;
            case "map":
                if (character.mapFile) {
                    const mapRef = mapsRefByFileName.get(character.mapFile);
                    if (mapRef) {
                        db.addRow("geographical_characters", [character.id, mapRef, character.color ?? ""]);
                    }
                }
                break;
            default:
                db.addRow("categorical_characters", [character.id, character.color ?? ""]);
            }
        }
        if (character.characterType === "range") {
            db.addRow("measurement_characters", [character.id, character.color ?? "", character.unit ?? ""]);
        }
        for (const stateId of character.inapplicableStatesIds) {
            db.addRow("descriptor_visibility_inapplicable", [character.id, stateId]);
        }
        for (const stateId of character.requiredStatesIds) {
            db.addRow("descriptor_visibility_requirements", [character.id, stateId]);
        }
    }
    for (const state of ds.states) {
        order++;
        db.addRow("documents", { ref: state.id, path: state.path.join("."), order, name: state.name, details: state.description ?? "" });
        if (state.nameCN) {
            db.addRow("document_translations", [state.id, "CN", state.nameCN, ""]);
        }
        if (state.nameEN) {
            db.addRow("document_translations", [state.id, "EN", state.nameEN, ""]);
        }
        db.addRow("states", [state.id, state.color ?? ""]);
        for (const [index, pic] of state.photos.entries()) {
            order++;
            db.addRow("document_attachments", [state.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
        }
    }
    for (const taxon of ds.taxons) {
        order++;
        db.addRow("documents", { ref: taxon.id, path: taxon.path.join("."), order, name: taxon.name, details: taxon.detail });
        if (taxon.vernacularName) {
            db.addRow("document_translations", [taxon.id, "V", taxon.vernacularName, ""]);
        }
        if (taxon.nameCN) {
            db.addRow("document_translations", [taxon.id, "CN", taxon.nameCN, ""]);
        }
        if (taxon.nameEN) {
            db.addRow("document_translations", [taxon.id, "EN", taxon.nameEN, ""]);
        }
        if (taxon.name2) {
            db.addRow("document_translations", [taxon.id, "S2", taxon.name2, ""]);
        }
        if (taxon.vernacularName2) {
            db.addRow("document_translations", [taxon.id, "V2", taxon.vernacularName2, ""]);
        }
        db.addRow("taxons", [taxon.id, taxon.author, taxon.website, taxon.meaning, taxon.noHerbier ?? "", taxon.herbariumPicture, taxon.fasc, taxon.page]);
        for (const [index, pic] of taxon.photos.entries()) {
            order++;
            if (pic.url) {
                db.addRow("document_attachments", [taxon.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
            }
        }
        for (const [bookRef, bookInfo] of Object.entries(taxon.bookInfoByIds ?? {})) {
            db.addRow("taxon_book_info", [taxon.id, bookRef, bookInfo.fasc, bookInfo.page, bookInfo.detail]);
        }
        for (const mesurement of taxon.measurements ?? []) {
            db.addRow("taxon_measurements", [taxon.id, mesurement.character, `${mesurement.min ?? ""}`, `${mesurement.max ?? ""}`]);
        }
        for (const description of taxon.descriptions) {
            for (const stateId of description.statesIds) {
                db.addRow("taxon_descriptions", [taxon.id, stateId]);
            }
        }
        for (const [index, location] of taxon.specimenLocations?.entries() ?? []) {
            db.addRow("specimen_locations", [taxon.id, `${index}`, `${location.lat ?? ""}`, `${location.lng ?? ""}`]);
        }
    }
}