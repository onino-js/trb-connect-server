"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const makeTable = tableName => {
    return new typeorm_1.Table({
        name: tableName,
        columns: [
            {
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'firtsName',
                type: 'varchar',
            },
            {
                name: 'lastName',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
            },
            {
                name: 'password',
                type: 'varchar',
            },
        ],
    });
};
class probes1541329463251 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(makeTable('probes'), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('probes');
        });
    }
}
exports.probes1541329463251 = probes1541329463251;
//# sourceMappingURL=1541329463251-probes.js.map