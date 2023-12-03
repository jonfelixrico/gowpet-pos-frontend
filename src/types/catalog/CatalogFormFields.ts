import { BaseCatalogItem } from './CatalogItem'

export type CatalogFormFields = Omit<BaseCatalogItem, 'type'>
