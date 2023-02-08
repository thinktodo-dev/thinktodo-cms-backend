const _get = require("lodash/get");
const { PATH_UPLOAD} = require("./constants");
export class StringHelper {
    public static isValidTypeUpload(mimetype) {
        return /^image/i.test(mimetype) && !/svg/i.test(mimetype);
    }
    public static formatDateUpload(date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    public static isValidPathUpload(pathToCheck) {
        return Object.values(PATH_UPLOAD).indexOf(pathToCheck) !== -1;
    }
}