'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("mangas", [
      {
        title: "One Piece",
        description: "One Piece follows Monkey D. Luffy as he embarks on a pirate journey to ne the next Pirate King " +
            "by finding the one piece of former Pirate King, Gol D. Roger",
        genre: "Action",
        author: "Jimmy Cotzee",
        status: "Ongoing"

      }, {
        title: "Attack on Titan",
        description: "Eren must face his fears when attacking the titans that killed his parents",
        genre: "Action",
        author: "Chris Welman",
        status: "Ongoing"
      }, {
        title: "One Punch Man",
        description: "Saitama, the strongest hero. He must find find a worthy opponent to test his strength against",
        genre: "Action",
        author: "Mitchy Ganguu",
        status: "Ongoing"
      }, {
        title: "Overlord",
        description: "Ainz Oal Gown must conquer the new world with his floor guardians in order to protect Nazareth",
        genre: "Adventure",
        author: "Momosku Willemse",
        status: "Completed"
      }, {
        title: "Sword Art Online",
        description: "Kirito must dive into the underworld to fight his nemesis to save the underworld and the people in it",
        genre: "Action",
        author: "Wano Blahk",
        status: "Completed"
      }, {
        title: "Tokyo Ghoul",
        description: "One Piece follows Monkey D. Luffy as he embarks on a pirate journey to ne the next Pirate King " +
            "by finding the one piece of former Pirate King, Gol D. Roger",
        genre: "Action",
        author: "Jimmy Cotzee",
        status: "Ongoing"
      }, {
        title: "Re Zero",
        description: "One Piece follows Monkey D. Luffy as he embarks on a pirate journey to ne the next Pirate King " +
            "by finding the one piece of former Pirate King, Gol D. Roger",
        genre: "Action",
        author: "Jimmy Cotzee",
        status: "Ongoing"
      }, {
        title: "Tokyo Ghoul",
        description: "One Piece follows Monkey D. Luffy as he embarks on a pirate journey to ne the next Pirate King " +
            "by finding the one piece of former Pirate King, Gol D. Roger",
        genre: "Action",
        author: "Jimmy Cotzee",
        status: "Ongoing"
      }, {
        title: "Code Geass",
        description: "One Piece follows Monkey D. Luffy as he embarks on a pirate journey to ne the next Pirate King " +
            "by finding the one piece of former Pirate King, Gol D. Roger",
        genre: "Action",
        author: "Jimmy Cotzee",
        status: "Ongoing"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("mangas", {}, null);
  }
};
