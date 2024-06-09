import { TaxonSummaryItem } from "./TaxonSummaryItem"

export type TaxonSummarySection = TaxonSummaryItem & {
    descriptors: (TaxonSummaryItem & { states: TaxonSummaryItem[] })[], 
};