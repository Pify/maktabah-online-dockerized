export interface BookDetailResponse {
    id: string,
    title: string,
    author: string,
    type: string,
    yearPublished: number,
    publisher: string,
    dateAdded: string,
    source: string,
    isOld: boolean,
    shelfCategory: string,
    isBorrowed: boolean
}