"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const measures_controller_1 = require("./measures.controller");
const measures_service_1 = require("./measures.service");
const measures_entity_1 = require("./measures.entity");
const probes_entity_1 = require("./../probes/probes.entity");
const probes_service_1 = require("./../probes/probes.service");
let MeasuresModule = class MeasuresModule {
};
MeasuresModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([measures_entity_1.MeasureEntity, probes_entity_1.ProbeEntity])],
        controllers: [measures_controller_1.measuresController],
        providers: [measures_service_1.MeasuresService, probes_service_1.ProbesService],
        exports: [measures_service_1.MeasuresService, probes_service_1.ProbesService],
    })
], MeasuresModule);
exports.MeasuresModule = MeasuresModule;
//# sourceMappingURL=measures.module.js.map