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
Object.defineProperty(exports, "__esModule", { value: true });
const sites_entity_1 = require("./../sites/sites.entity");
const typeorm_1 = require("typeorm");
const probes_entity_1 = require("./../probes/probes.entity");
let MeasureEntity = class MeasureEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MeasureEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], MeasureEntity.prototype, "dateTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MeasureEntity.prototype, "value", void 0);
__decorate([
    typeorm_1.ManyToOne(type => probes_entity_1.ProbeEntity, probe => probe.measures, {
        cascade: true,
    }),
    __metadata("design:type", probes_entity_1.ProbeEntity)
], MeasureEntity.prototype, "probe", void 0);
__decorate([
    typeorm_1.ManyToOne(type => sites_entity_1.SiteEntity, site => site.measures, {
        cascade: true,
    }),
    __metadata("design:type", sites_entity_1.SiteEntity)
], MeasureEntity.prototype, "site", void 0);
MeasureEntity = __decorate([
    typeorm_1.Entity('measures')
], MeasureEntity);
exports.MeasureEntity = MeasureEntity;
//# sourceMappingURL=measures.entity.js.map