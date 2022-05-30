"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_key_1 = require("../metadata.key");
const Controller = (basePath) => {
    return (target) => {
        Reflect.defineMetadata(metadata_key_1.MetadataKeys.BASE_PATH, basePath, target);
    };
};
exports.default = Controller;
