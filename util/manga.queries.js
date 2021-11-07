const models = require("../models");
const json = require("body-parser");



/**
 * Returns a model by primary key
 * @param modelName
 * @param identifier
 * @returns {Promise<T | {}>}
 */
function findByPk(modelName, identifier) {
    let result = {};

    return models[modelName].findByPk(identifier).then(query => {
        if (query) {
            result[`${modelName}`] = query;
            return result;
        } else {
            result[`${modelName}`] = null;
            return result;
        }
    }).catch(error => {
        result["Error"] = error;
        return result;
    });
}

/**
 * Find a model if exists
 * @param modelName
 * @param obj
 * @returns {Promise<T | {}>}
 */
function findOne(modelName, obj) {
    let result = {};

    return models[modelName].findOne(obj).then(query => {
        if (query) {
            result[`${modelName}`] = query;
            return result;
        } else {
            result[`${modelName}`] = null;
            return result;
        }
    }).catch(error => {
        result["Error"] = error;
        return result;
    });
}

/**
 * update a model in database
 * @param modelName
 * @param objQuery
 * @param objValue
 * @returns {Promise<T | {}>}
 */
function update(modelName, objQuery, objValue) {
    let result = {};

    return models[modelName].update(objQuery, objValue).then(query => {
        result[`${modelName}`] = query;
        return result;

    }).catch(error => {
        result["Error"] = error;
        return result;
    });
}


/**
 * create a model
 * @param modelName
 * @param model
 * @returns {Promise<T | {}>}
 */
function create(modelName, model) {
    let result = {};

    return models[modelName].create(model).then(query => {
        result[`${modelName}`] = query;
        return result;

    }).catch(error => {
        result[`Error`] = error;
        return result;
    });
}

function findAll(modelName, obj) {
    let result = {};
	
	if (!obj) {
		return models[modelName].findAll().then(query => {
			result[`${modelName}`] = query;
			return result;
		}).catch(error => {
			result[`Error`] = error;
			return result;
		});
	}else {
		return models[modelName].findAll(obj).then(query => {
			result[`${modelName}`] = query;
			return result;
		}).catch(error => {
			result[`Error`] = error;
			return result;
		});	
	}
    
}

function destroy(modelName, objQuery) {
    let result = {};

    return models[modelName].destroy(objQuery).then(() => {
        result["message"] = "Manga deleted successfully";
        return result;
    }).catch(error => {
        result["error"] = error;
        return result;
    })
}

module.exports = {
    findByPk: findByPk,
    findOne: findOne,
    update: update,
    create: create,
    findAll: findAll,
    destroy: destroy
}






