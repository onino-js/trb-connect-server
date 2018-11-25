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
const sites_entity_1 = require("./sites.entity");
let sitesService = class sitesService {
    constructor(sitesRepository) {
        this.sitesRepository = sitesRepository;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sitesRepository.find({ relations: ['probes'] });
        });
    }
    findMines(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.sitesRepository.find({
                relations: ['probes', 'users'],
            });
            res = res.filter((site, index) => {
                return (site.users.findIndex((user, index) => user.email === email) !== -1);
            });
            return res;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteToRemove = yield this.sitesRepository.findOne(id);
            let res;
            if (siteToRemove === undefined) {
                res = {
                    status: 404,
                    message: "Le site n'existe pas",
                };
            }
            else {
                try {
                    yield this.sitesRepository.remove(siteToRemove);
                    res = {
                        status: 200,
                        message: "L'utilisateur a été supprimmé avec succès",
                    };
                }
                catch (e) {
                    res = {
                        status: 500,
                        message: "Problème lors de l'enregistrement",
                    };
                }
            }
            return res;
        });
    }
    create(site) {
        return __awaiter(this, void 0, void 0, function* () {
            let newSite = new sites_entity_1.SiteEntity();
            Object.assign(newSite, site);
            let res;
            newSite.id = Math.round(Math.abs(Math.random()) * 10000000);
            const err = yield class_validator_1.validate(newSite);
            if (err.length > 0) {
                res = {
                    status: 400,
                    message: 'Mauvaises entrées',
                };
            }
            else {
                try {
                    yield this.sitesRepository.save(newSite);
                    res = { status: 200, message: 'Le site a été ajouté' };
                }
                catch (e) {
                    res = { status: 500, message: "Problème lors de l'enregistrement" };
                }
            }
            return res;
        });
    }
    update(site) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteToUpdate = yield this.sitesRepository.findOne(site.id);
            let res;
            if (siteToUpdate === undefined) {
                res = {
                    status: 404,
                    message: `sites with name ${site.name}, does not exist`,
                };
            }
            else {
                try {
                    yield this.sitesRepository.save(Object.assign({}, siteToUpdate, site));
                    res = {
                        status: 200,
                        message: `L'utilisateur a été mis à jours`,
                    };
                }
                catch (e) {
                    res = {
                        status: 500,
                        message: `Problème lors de la mise à jours`,
                    };
                }
            }
            return res;
        });
    }
};
sitesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(sites_entity_1.SiteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], sitesService);
exports.sitesService = sitesService;
//# sourceMappingURL=sites.service.js.map