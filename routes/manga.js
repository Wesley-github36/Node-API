const express = require("express");
const mangaController = require("../controllers/manga.controller");

const router = express.Router();

router.get("/today", mangaController.latest);
router.get("/avatar", express.static(__dirname+"/avatar/"));
//
module.exports = router;