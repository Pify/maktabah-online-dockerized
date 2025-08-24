export interface BookFormRequest {
    id?: string | null,
    title: string,
    author: string,
    type: string,
    yearPublished: number,
    publisher: string,
    dateAdded: Date,
    source: string,
    isOld: boolean,
    shelfCategory: string,
    isBorrowed?: boolean | null
}