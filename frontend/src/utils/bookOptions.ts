export const BOOK_TYPES = [
    { label: "Ushul Fiqh", value: "Ushul Fiqh" },
    { label: "Tauhid", value: "Tauhid" },
    { label: "Tafsir Al Quran", value: "Tafsir Al Quran" },
    { label: "Siroh", value: "Siroh" },
    { label: "Nahwu", value: "Nahwu" },
    { label: "Shorof", value: "Shorof" },
    { label: "Mustholah hadits", value: "Mustholah hadits" },
    { label: "Aqidah", value: "Aqidah" }
];

export const BOOK_SHELVES = [
    { label: "Fiqh", value: "Fiqh" },
    { label: "Manhaj", value: "Manhaj" },
    { label: "Quran & tafsir", value: "Quran & tafsir" },
    { label: "Hadits", value: "Hadits" },
    { label: "Siroh", value: "Siroh" },
    { label: "Aqidah", value: "Aqidah" },
    { label: "Lughoh", value: "Lughoh" },
];

// Optional: helper to get label by value
export function getBookTypeLabel(value: string) {
    return BOOK_TYPES.find(t => t.value === value)?.label || value;
}

export function getBookShelfLabel(value: string) {
    return BOOK_SHELVES.find(t => t.value === value)?.label || value;
}