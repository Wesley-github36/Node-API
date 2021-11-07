const multer = require("multer");
const path = require("path");
const models = require("../models");
const mkdirp = require("mkdirp");
const mangaQueries = require("../util/manga.queries");

let manga = null;
let title = null;

const chapterImages = multer.diskStorage({
    destination: async function (req, file, cb) {
        const chapter = parseInt(req.params.chapter)
        const order = parseInt(req.params.order)
        const mangaId = parseInt(req.params.mangaId)

        if (!chapter) return cb(new Error("`chapter` parameter expected"), false);
        if (!order) return cb(new Error("`order` parameter expected"), false);
        if (!mangaId) return cb(new Error("`manga id` parameter expected"), false);

        let result = await mangaQueries.findByPk("Manga", mangaId)

        if (result.Manga) {
            manga = result.Manga;
            const splitTile = manga.title.split(" ");
            title = splitTile[0];

            for (let i=1; i < splitTile.length; i++)
                title += `-${splitTile[i]}`

            const dirname = "./chapter-images/"+title+"/chapters/"+chapter

            mkdirp(dirname, function (error) {
                cb(null, dirname)
            })

        }else return cb(new Error(`Something went wrong\nError: ${result.error}`));

    },
    filename: function (req, file, cb) {

        req.mangaName = title

        const filename = title+"-chapter-"+req.params.chapter+"-order-"+req.params.order+path.extname(file.originalname)
        cb(null, filename)
    }
})

const avatar = multer.diskStorage({
    destination: function (req, file, cb) {
        const id = parseInt(req.params.id);

        if (!id)
            return cb(new Error("`id` parameter expected"), false);

        if (!req.params.manga)
            return cb(new Error("manga parameter expected"), false);
        //if (req.params.manga.indexOf(" ") >)

        models.Manga.findByPk(id).then(manga => {

            if (manga)
                cb(null, "./manga-avatar");
            else
                cb(new Error("Manga not found"), false);

        }).catch(error => {
            return cb(new Error(`Something went wrong\nError: ${error}`));
        });

    },
    filename: function (req, file, cb) {
        cb(null, req.params.manga+"-avatar"+path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }else {
        cb(new Error("Unsupported file"), false);
    }
}

const chapterImagesUpload = multer({
    storage: chapterImages,
    fileFilter: fileFilter
});

const avatarUpload = multer({
    storage: avatar,
    fileFilter: fileFilter
})

module.exports = {
    chapterImagesUpload: chapterImagesUpload,
    avatarUpload: avatarUpload
}