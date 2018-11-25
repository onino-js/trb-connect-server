"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const probes_entity_1 = require("./probes.entity");
let ProbesService = class ProbesService {
    constructor(probesRepository) {
        this.probesRepository = probesRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.probesRepository.find({ relations: ['site'] });
        });
    }
    create(probe) {
        return __awaiter(this, void 0, void 0, function* () {
            let newProbe = new probes_entity_1.ProbeEntity();
            Object.assign(newProbe, probe);
            const err = yield class_validator_1.validate(newProbe);
            if (err.length > 0) {
                console.warn(err);
                throw new common_1.NotAcceptableException();
            }
            yield this.probesRepository.save(newProbe);
            return newProbe;
        });
    }
    updateFromMeasure(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            let probesToUpdate = yield this.probesRepository.findOne({
                id: measure.probe.id,
            });
            probesToUpdate.dateTime = measure.dateTime;
            probesToUpdate.value = measure.value;
            yield this.probesRepository.save(probesToUpdate);
            return measure;
        });
    }
};
ProbesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(probes_entity_1.ProbeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProbesService);
exports.ProbesService = ProbesService;
//# sourceMappingURL=probes.service.js.map