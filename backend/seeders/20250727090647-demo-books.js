'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('Seeding books..');
    const books = [
      {
        id: "af5c329c-d9a0-49fc-a9f0-36a72ce9b8eb",
        title: "Al Aqidah Wasithiyyah",
        author: "Syaikhul Islam Ibnu Taimiyyah",
        yearPublished: 702,
        publisher: "-",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "Wikipedia",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "df6c320b-23a9-4b01-90cd-99ef12a4c123",
        title: "Sharh al-Aqidah al-Tahawiyyah",
        author: "Ibnu Abil 'Izz al-Hanafi",
        yearPublished: 733,
        publisher: "Dar al-Fikr",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "Library",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a1e8b78f-86d6-45f2-bfbb-88295f12ac9f",
        title: "Kitab al-Tawhid",
        author: "Muhammad bin Abdul Wahhab",
        yearPublished: 1150,
        publisher: "-",
        type: "Tawhid",
        dateAdded: new Date("2025-07-27"),
        source: "Ulama Audio Series",
        isOld: true,
        shelfCategory: "Tawhid",
        isBorrowed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "b1f9d64e-ccdf-49ae-bc6e-c9cfdb6e44af",
        title: "Lum'atul I'tiqad",
        author: "Ibnu Qudamah al-Maqdisi",
        yearPublished: 620,
        publisher: "-",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "Audio Notes",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3c1b674c-bfa7-4d3c-9012-dc667d6b73f7",
        title: "Aqidah al-Imam al-Barbahari",
        author: "Al-Barbahari",
        yearPublished: 329,
        publisher: "-",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "PDF",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ec64dbb4-d05e-474e-a999-5fdc99747fae",
        title: "Al-Ushul Ats-Tsalatsah",
        author: "Muhammad bin Abdul Wahhab",
        yearPublished: 1200,
        publisher: "Darussalam",
        type: "Tawhid",
        dateAdded: new Date("2025-07-27"),
        source: "Official Print",
        isOld: false,
        shelfCategory: "Tawhid",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "f1e3c23a-a3f5-4428-8f24-c3ed672cde1a",
        title: "Syarah Lum'atul I'tiqad",
        author: "Shaykh Muhammad Salih al-Uthaymin",
        yearPublished: 1400,
        publisher: "Maktabah as-Salafiyyah",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "YouTube Series",
        isOld: false,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ec873d44-8a26-49c5-83c9-1a576a7a28a9",
        title: "Al-Ibanah ‘an Usul al-Diyanah",
        author: "Al-Imam Ibn Battah",
        yearPublished: 387,
        publisher: "-",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "Personal Scan",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "1f03730f-26f6-4d52-b7cc-8f2d8f34dd99",
        title: "Fath al-Majid",
        author: "Abdurrahman bin Hasan",
        yearPublished: 1230,
        publisher: "Dar al-Kutub",
        type: "Tafsir/Tawhid",
        dateAdded: new Date("2025-07-27"),
        source: "Printed Copy",
        isOld: true,
        shelfCategory: "Tawhid",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "49e158c2-8ae5-47b3-92a3-77a588e0325c",
        title: "Al-Aqidah Al-Tadmuriyyah",
        author: "Syaikhul Islam Ibnu Taimiyyah",
        yearPublished: 728,
        publisher: "-",
        type: "Aqidah",
        dateAdded: new Date("2025-07-27"),
        source: "Wikipedia",
        isOld: true,
        shelfCategory: "Aqidah",
        isBorrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('books', books, {});
    console.log('Books seeded successfully');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
    console.log('Books deleted successfully');
  }
};