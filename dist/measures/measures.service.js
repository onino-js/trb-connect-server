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
const measures_entity_1 = require("./measures.entity");
const probes_service_1 = require("./../probes/probes.service");
let MeasuresService = class MeasuresService {
    constructor(measuresRepository, probesService) {
        this.measuresRepository = measuresRepository;
        this.probesService = probesService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.measuresRepository.find();
        });
    }
    findAllWithRelation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.measuresRepository.find({ relations: ['probe', 'site'] });
        });
    }
    findByProbe(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.measuresRepository
                .createQueryBuilder('measure')
                .innerJoinAndSelect('measure.probe', 'probe')
                .where(`measure.probe.id = ${options.probeId}`)
                .orderBy('measure.dateTime', 'DESC')
                .take(10)
                .getMany();
            return res;
        });
    }
    findBySite(siteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.measuresRepository
                .createQueryBuilder('measure')
                .innerJoinAndSelect('measure.site', 'site')
                .innerJoinAndSelect('measure.probe', 'probe')
                .where(`measure.site.id = ${siteId}`)
                .orderBy('measure.dateTime', 'ASC')
                .getMany();
            return res;
        });
    }
    create(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            let newMeasure = new measures_entity_1.MeasureEntity();
            Object.assign(newMeasure, measure);
            const err = yield class_validator_1.validate(newMeasure);
            if (err.length > 0) {
                console.warn(err);
                throw new common_1.NotAcceptableException();
            }
            yield this.probesService.updateFromMeasure(newMeasure);
            yield this.measuresRepository.save(newMeasure);
            return newMeasure;
        });
    }
};
MeasuresService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(measures_entity_1.MeasureEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        probes_service_1.ProbesService])
], MeasuresService);
exports.MeasuresService = MeasuresService;
//# sourceMappingURL=measures.service.js.map