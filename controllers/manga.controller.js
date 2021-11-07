// const models = require("../models");
// import db from '../models';
// const mangaQueries = require("../util/manga.queries");
const models = require("../models");
// const sequelize = require("sequelize");

async function latest(req, res) {
	
	const start = 12;
	const end = 13;
	
    const olderDate = new Date(new Date().setDate(new Date().getDate() - end)).toISOString().split("T")[0]


    let mangas = await models.sequelize.query(
        "SELECT * FROM Mangas LEFT JOIN Chapters ON Mangas.id = Chapters.mangaId " +
        "WHERE Chapters.createdAt >= (:yesterday) ORDER BY Chapters.createdAt DESC", {
            replacements: {yesterday: olderDate},
            type: models.sequelize.QueryTypes.SELECT
        });

    let mangaIDS = []
    let response = []
    let result = {}

    let yesterdayFlag = true
    let olderFlag = true

    const yesterday = new Date(new Date().setDate(new Date().getDate() - start)).toISOString().split("T")[0]
    const dayBeforeYesterday = new Date(new Date().setDate(new Date().getDate() - end)).toISOString().split("T")[0]

    for (let i = 0; i < mangas.length; i++) {


        let manga = (({mangaId, title, description, genre, avatarUrl, status, author, chapters = []}) =>
            ({mangaId, title, description, genre, avatarUrl, status, author, chapters}))(mangas[i])

        let chapter = (({id, chapter, createdAt, updatedAt}) =>
            ({id, chapter, createdAt, updatedAt}))(mangas[i])


        if (chapter.createdAt.toISOString().split("T")[0] === yesterday) {

            if (yesterdayFlag) {
                result.today = response
                mangaIDS = []
                response = []
                yesterdayFlag = false
            }
        }

        if (chapter.createdAt.toISOString().split("T")[0] === dayBeforeYesterday) {

            if (olderFlag) {
                result.yesterday = response
                mangaIDS = []
                response = []
                olderFlag = false
            }
        }

        const indexOf = mangaIDS.indexOf(manga.mangaId)

        if (indexOf < 0) {
            mangaIDS.push(manga.mangaId)
            manga.chapters.push(chapter)

            response.push(manga)
        }else {
            response[indexOf].chapters.push(chapter)
        }

    }

    if (!olderFlag && !yesterdayFlag) {
        result.older = response
    }else if (!yesterdayFlag && olderFlag) {
        result.yesterday = response
    }else {
        result.today = response
    }

    return res.send(result)
    
}


module.exports = {
    latest: latest
}

// async function today(req, res) {
//     models["Manga"].hasMany(models["ChapterImagesUrl"], {foreignKey: "id"})
//     models["ChapterImagesUrl"].belongsTo(models["Manga"], {foreignKey: "mangaId"});
//
//     const yesterday = new Date(new Date().setDate(new Date().getDate() - 7));
//
//     models["ChapterImagesUrl"].findAll({
//         where: {
//             createdAt: {
//                 [Op.gt]: yesterday
//             },
//         },
//         include: ["Manga"]
//     }).then(r => res.status(200).json(r))
//
//         .catch(e => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 error: e
//             })
//         })
// }

