import { EncodedDataset } from "./codec";
import { standardMaps, standardUnits } from "../datatypes/stdcontent";
import Months from "../datatypes/Months";

const DocumentColumns = ["ref", "path:ltree", "doc_order:i64", "name", "details"];
const LangColumns = ["ref", "name"];
const DocumentTranslationsColumns = ["document_ref", "lang_ref", "name", "details"];
const CategoricalCharacterColumns = ["document_ref", "color:hexcolor"];
const StateColumns = ["document_ref", "color:hexcolor"];
const PeriodicCharacterColumns = ["document_ref", "periodic_category_ref", "color:hexcolor"];
const GeographicalPlaceColumns = ["document_ref", "latitude:f64", "longitude:f64", "scale:i64"];
const GeographicalMapColumns = ["document_ref", "place_ref", "map_file", "map_file_feature_name"];
const GeographicalCharacterColumns = ["document_ref", "map_ref", "color:hexcolor"];
const UnitColumns = ["ref", "base_unit_ref", "to_base_unit_factor:f64"];
const MeasurementCharacterColumns = ["document_ref", "color:hexcolor", "unit_ref"];
const DocumentAttachmentColumns = ["document_ref", "attachment_index:i64", "source:url", "path:path"];
const BookColumns = ["document_ref", "isbn"];
const DescriptorVisibilityRequirementColumns = ["descriptor_ref", "required_descriptor_ref"];
const DescriptorVisibilityInapplicableColumns = ["descriptor_ref", "inapplicable_descriptor_ref"];
const TaxonColumns = ["document_ref", "author", "website:url", "meaning", "herbarium_no", "herbarium_picture", "fasc:i64", "page:i64"];
const TaxonMeasurementColumns = ["taxon_ref", "character_ref", "minimum:f64", "maximum:f64"];
const TaxonDescriptionColumns = ["taxon_ref", "description_ref"];
const BookInfoColumns = ["taxon_ref", "book_ref", "fasc:i64", "page:i64", "details"];
const SpecimenLocationColumns = ["taxon_ref", "specimen_index:i64", "latitude:f64", "longitude:f64"];

function numberToCsv(s: string): string {
    if (s === "null" || s === "undefined") {
        return "";
    }
    const n = Number(s);
    if (Number.isNaN(n)) {
        return "";
    }
    return n.toString(10);
}

export function datasetToRelational(dataset: EncodedDataset) {
    const csvFiles = {
        document: [DocumentColumns],
        lang: [LangColumns, ["V", "Vernacular"], ["CN", "Chinese"], ["EN", "English"], ["FR", "French"], ["V2", "Vernacular 2"], ["S2", "Name 2"]],
        document_translation: [DocumentTranslationsColumns],
        categorical_character: [CategoricalCharacterColumns],
        state: [StateColumns],
        periodic_character: [PeriodicCharacterColumns],
        geographical_place: [GeographicalPlaceColumns],
        geographical_map: [GeographicalMapColumns],
        geographical_character: [GeographicalCharacterColumns],
        unit: [UnitColumns],
        measurement_character: [MeasurementCharacterColumns],
        document_attachment: [DocumentAttachmentColumns],
        book: [BookColumns],
        descriptor_visibility_requirement: [DescriptorVisibilityRequirementColumns],
        descriptor_visibility_inapplicable: [DescriptorVisibilityInapplicableColumns],
        taxon: [TaxonColumns],
        taxon_measurement: [TaxonMeasurementColumns],
        taxon_description: [TaxonDescriptionColumns],
        taxon_book_info: [BookInfoColumns],
        taxon_specimen_location: [SpecimenLocationColumns],
    };
    let order = 0;
    for (const [ref, unit] of Object.entries(standardUnits)) {
        csvFiles.unit.push([ref, unit.base?.unit.name.S ?? "", `${unit.base?.factor ?? ""}`]);
    }
    const CALENDAR_ID = "_cal";
    csvFiles.document.push([CALENDAR_ID, "", `${order}`, "Calendar", "Gregorian calendar"]);
    order++;
    for (let i = 0; i < Months.NAMES.length; i++) {
        const month = Months.NAMES[i];
        csvFiles.document.push([`_cal_${month}`, CALENDAR_ID, `${i}`, `${month}`, ""]);
    }
    const ROOT_PLACE_ID = "_geo";
    csvFiles.document.push([ROOT_PLACE_ID, "", `${order}`, "Geographical Places", "All geographical places"]);
    order++;
    const MADA_PLACE_ID = "_geo_mada";
    csvFiles.document.push([MADA_PLACE_ID, ROOT_PLACE_ID, `${order}`, "Madagascar", "The island of Madagascar"]);
    csvFiles.geographical_place.push([MADA_PLACE_ID, "-18.546564", "46.518367", "2000"]);
    const mapsRefByFileName = new Map<string, string>();
    for (const [i, map] of standardMaps.entries()) {
        order++;
        const DOC_ID = `_geo_mada_${i+1}`;
        csvFiles.document.push([DOC_ID, MADA_PLACE_ID, `${i}`, map.name, "The island of Madagascar"]);
        csvFiles.geographical_map.push([DOC_ID, MADA_PLACE_ID, map.fileName, map.property]);
        mapsRefByFileName.set(map.fileName, DOC_ID);
    }
    for (const book of dataset.books) {
        order++;
        csvFiles.document.push([book.id, book.path.join("."), `${order}`, book.label, ""]);
        csvFiles.book.push([book.id, ""]);
    }
    for (const character of dataset.characters) {
        order++;
        csvFiles.document.push([character.id, character.path.join("."), `${order}`, character.name, character.detail]);
        if (character.nameCN) {
            csvFiles.document_translation.push([character.id, "CN", character.nameCN, ""]);
        }
        if (character.nameEN) {
            csvFiles.document_translation.push([character.id, "EN", character.nameEN, ""]);
        }
        for (const [index, pic] of character.photos.entries()) {
            order++;
            csvFiles.document_attachment.push([character.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
        }
        if (character.characterType === "discrete") {
            switch (character.preset) {
            case "flowering":
                csvFiles.periodic_character.push([character.id, CALENDAR_ID, character.color ?? ""]);
                break;
            case "map":
                if (character.mapFile) {
                    const mapRef = mapsRefByFileName.get(character.mapFile);
                    if (mapRef) {
                        csvFiles.geographical_character.push([character.id, mapRef, character.color ?? ""]);
                    }
                }
                break;
            default:
                csvFiles.categorical_character.push([character.id, character.color ?? ""]);
            }
        }
        if (character.characterType === "range") {
            csvFiles.measurement_character.push([character.id, character.color ?? "", character.unit ?? ""]);
        }
        for (const stateId of character.inapplicableStatesIds) {
            csvFiles.descriptor_visibility_inapplicable.push([character.id, stateId]);
        }
        for (const stateId of character.requiredStatesIds) {
            csvFiles.descriptor_visibility_requirement.push([character.id, stateId]);
        }
    }
    for (const state of dataset.states) {
        order++;
        csvFiles.document.push([state.id, state.path.join("."), `${order}`, state.name, state.description ?? ""]);
        if (state.nameCN) {
            csvFiles.document_translation.push([state.id, "CN", state.nameCN, ""]);
        }
        if (state.nameEN) {
            csvFiles.document_translation.push([state.id, "EN", state.nameEN, ""]);
        }
        csvFiles.state.push([state.id, state.color ?? ""]);
        for (const [index, pic] of state.photos.entries()) {
            order++;
            csvFiles.document_attachment.push([state.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
        }
    }
    for (const taxon of dataset.taxons) {
        order++;
        csvFiles.document.push([taxon.id, taxon.path.join("."), `${order}`, taxon.name, taxon.detail]);
        if (taxon.vernacularName) {
            csvFiles.document_translation.push([taxon.id, "V", taxon.vernacularName, ""]);
        }
        if (taxon.nameCN) {
            csvFiles.document_translation.push([taxon.id, "CN", taxon.nameCN, ""]);
        }
        if (taxon.nameEN) {
            csvFiles.document_translation.push([taxon.id, "EN", taxon.nameEN, ""]);
        }
        if (taxon.name2) {
            csvFiles.document_translation.push([taxon.id, "S2", taxon.name2, ""]);
        }
        if (taxon.vernacularName2) {
            csvFiles.document_translation.push([taxon.id, "V2", taxon.vernacularName2, ""]);
        }
        csvFiles.taxon.push([taxon.id, taxon.author, taxon.website, taxon.meaning, taxon.noHerbier ?? "", taxon.herbariumPicture, numberToCsv(taxon.fasc), numberToCsv(taxon.page)]);
        for (const [index, pic] of taxon.photos.entries()) {
            order++;
            if (pic.url) {
                csvFiles.document_attachment.push([taxon.id, `${index}`, pic.url, pic.hubUrl ?? ""]);
            }
        }
        for (const [bookRef, bookInfo] of Object.entries(taxon.bookInfoByIds ?? {})) {
            csvFiles.taxon_book_info.push([taxon.id, bookRef, numberToCsv(bookInfo.fasc), numberToCsv(bookInfo.page), bookInfo.detail]);
        }
        for (const mesurement of taxon.measurements ?? []) {
            csvFiles.taxon_measurement.push([taxon.id, mesurement.character, `${mesurement.min ?? ""}`, `${mesurement.max ?? ""}`]);
        }
        for (const description of taxon.descriptions) {
            for (const stateId of description.statesIds) {
                csvFiles.taxon_description.push([taxon.id, stateId]);
            }
        }
        for (const [index, location] of taxon.specimenLocations?.entries() ?? []) {
            csvFiles.taxon_specimen_location.push([taxon.id, `${index}`, `${location.lat ?? ""}`, `${location.lng ?? ""}`]);
        }
    }
    return csvFiles;
}