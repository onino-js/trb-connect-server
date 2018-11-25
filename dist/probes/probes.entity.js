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
const measures_entity_1 = require("./../measures/measures.entity");
const sites_entity_1 = require("./../sites/sites.entity");
const typeorm_1 = require("typeorm");
let ProbeEntity = class ProbeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProbeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 'undefined' }),
    __metadata("design:type", String)
], ProbeEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], ProbeEntity.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ProbeEntity.prototype, "dateTime", void 0);
__decorate([
    typeorm_1.ManyToOne(type => sites_entity_1.SiteEntity, site => site.probes, {
        cascade: true,
    }),
    __metadata("design:type", sites_entity_1.SiteEntity)
], ProbeEntity.prototype, "site", void 0);
__decorate([
    typeorm_1.OneToMany(type => measures_entity_1.MeasureEntity, measure => measure.probe),
    __metadata("design:type", Array)
], ProbeEntity.prototype, "measures", void 0);
ProbeEntity = __decorate([
    typeorm_1.Entity('probes')
], ProbeEntity);
exports.ProbeEntity = ProbeEntity;
//# sourceMappingURL=probes.entity.js.map