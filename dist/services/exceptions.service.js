"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class NotFoundException extends common_1.HttpException {
    constructor() {
        super('not found', common_1.HttpStatus.FORBIDDEN);
    }
}
exports.NotFoundException = NotFoundException;
class ForbiddenException extends common_1.HttpException {
    constructor() {
        super('Forbidden', common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=exceptions.service.js.map