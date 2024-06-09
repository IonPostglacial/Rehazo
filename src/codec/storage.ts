import { createStore } from "tinybase/lib/types/store/with-schemas";

export function createStorage() {
    return createStore().setTablesSchema({
        documents: {
            ref: { type: 'string' },
            path: { type: 'string', default: '' },
            order: { type: 'number' },
            name: { type: 'string' },
            details: { type: 'string' },
        },
        langs: {
            ref: { type: 'string' },
            name: { type: 'string' },
        },
        document_translations: {
            document_ref: { type: 'string' },
            lang_ref: { type: 'string' },
        },
        categorical_characters: {
            document_ref: { type: 'string' },
            color: { type: 'string' },
        },
        states: {
            document_ref: { type: 'string' },
            color: { type: 'string' },
        },
        periodic_characters: {
            document_ref: { type: 'string' },
            periodic_category_ref: { type: 'string' },
            color: { type: 'string' },
        },
        geographical_places: {
            document_ref: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            scale: { type: 'number' },
        },
        geographical_maps: {
            document_ref: { type: 'string' },
            place_ref: { type: 'string' },
            map_file: { type: 'string' },
            map_file_feature_name: { type: 'string' },
        },
        geographical_characters: {
            document_ref: { type: 'string' },
            map_ref: { type: 'string' },
            color: { type: 'string' },
        },
        units: {
            ref: { type: 'string' },
            base_unit_ref: { type: 'string' },
            to_base_unit_factor: { type: 'number' },
        },
        measurement_characters: {
            document_ref: { type: 'string' },
            unit_ref: { type: 'string' },
            color: { type: 'string' },
        },
        document_attachments: {
            document_ref: { type: 'string' },
            index: { type: 'number' },
            source: { type: 'string' },
            path: { type: 'string' },
        },
        books: {
            document_ref: { type: 'string' },
            isbn: { type: 'string' },
        },
        descriptor_visibility_requirements: {
            descriptor_ref: { type: 'string' },
            required_descriptor: { type: 'string' },
        },
        descriptor_visibility_inapplicable: {
            descriptor_ref: { type: 'string' },
            inapplicable_descriptor_ref: { type: 'string' },
        },
        taxons: {
            document_ref: { type: 'string' },
            author: { type: 'string' },
            website: { type: 'string' },
            meaning: { type: 'string' },
            herbarium_no: { type: 'string' },
            herbarium_picture: { type: 'string' },
            fasc: { type: 'number' },
            page: { type: 'number' },
        },
        taxon_measurements: {
            taxon_ref: { type: 'string' },
            character_ref: { type: 'string' },
            minimum: { type: 'number' },
            maximum: { type: 'number' },
        },
        taxon_descriptions: {
            taxon_ref: { type: 'string' },
            description_ref: { type: 'string' },
        },
        taxon_book_info: {
            taxon_ref: { type: 'string' },
            book_ref: { type: 'string' },
            fasc: { type: 'number' },
            page: { type: 'number' },
            details: { type: 'string' },
        },
        specimen_locations: {
            taxon_ref: { type: 'string' },
            index: { type: 'number' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
        },
    });
}