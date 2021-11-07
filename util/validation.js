const Joi = require("joi");

/**
 * Validate params of manga
 * @param manga
 * @returns {Joi.ValidationResult}
 */
function validateManga(manga) {
    const schema = Joi.object({
        title: Joi.string().min(2).required().regex(/^[a-zA-Z0-9 ]+$/),
        description: Joi.string().min(2).required(),
        avatarUrl: Joi.string().min(2).optional(),
        genre: Joi.string().min(2).required(),
        author: Joi.string().min(2).required(),
        status: Joi.allow("Completed", "Ongoing").only().required(),
        picked: Joi.allow(0,1).only().optional()
    });

    return schema.validate(manga);
}

function validateUser(user, login) {
    let schema;

    if (login) {
        schema = Joi.object({
            email: Joi.string().min(6).email(),
            password: Joi.string().min(8).required()
        })
    }
    else {
        schema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().min(6).email(),
            password: Joi.string().min(8).required()
        })
    }

    return schema.validate(user);
}

module.exports = {
    validateManga: validateManga,
    validateUser: validateUser
}