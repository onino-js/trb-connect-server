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
const get_user_1 = require("./../auth/get-user");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const sites_service_1 = require("./sites.service");
let sitesController = class sitesController {
    constructor(sitesService) {
        this.sitesService = sitesService;
    }
    findAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = get_user_1.getUserFromToken(request);
            return this.sitesService.findMines(email);
        });
    }
    findMines(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = get_user_1.getUserFromToken(request);
            return this.sitesService.findMines(email);
        });
    }
    getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sitesService.find();
        });
    }
    getMines(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = get_user_1.getUserFromToken(request);
            return this.sitesService.find();
        });
    }
    create(site) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sitesService.create(site);
        });
    }
    remove(siteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sitesService.remove(siteId);
        });
    }
    update(site) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sitesService.update(site);
        });
    }
};
__decorate([
    common_1.Get('list'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "findAll", null);
__decorate([
    common_1.Get('list-mines'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "findMines", null);
__decorate([
    common_1.Get('get'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "getAll", null);
__decorate([
    common_1.Get('get-mines'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "getMines", null);
__decorate([
    common_1.Post('create'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "create", null);
__decorate([
    common_1.Post('delete'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "remove", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], sitesController.prototype, "update", null);
sitesController = __decorate([
    common_1.Controller('sites'),
    __metadata("design:paramtypes", [sites_service_1.sitesService])
], sitesController);
exports.sitesController = sitesController;
//# sourceMappingURL=sites.controller.js.map