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
const sites_controller_1 = require("./sites.controller");
const sites_service_1 = require("./sites.service");
const sites_entity_1 = require("./sites.entity");
let SitesModule = class SitesModule {
};
SitesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([sites_entity_1.SiteEntity])],
        controllers: [sites_controller_1.sitesController],
        providers: [sites_service_1.sitesService],
        exports: [sites_service_1.sitesService],
    })
], SitesModule);
exports.SitesModule = SitesModule;
//# sourceMappingURL=sites.module.js.map