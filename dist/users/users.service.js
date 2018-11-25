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
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    onModuleDestroy() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find({ relations: ['sites'] });
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ email: email });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToRemove = yield this.userRepository.findOne(id);
            let res;
            if (userToRemove === undefined) {
                res = {
                    status: 404,
                    message: "L'utilisateur n'existe pas",
                };
            }
            else {
                yield this.userRepository.remove(userToRemove);
                res = {
                    status: 200,
                    message: "L'utilisateur a été supprimmé avec succès",
                };
            }
            return res;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToUpdate = yield this.userRepository.findOne(user.id);
            let res;
            console.log(user);
            if (userToUpdate === undefined) {
                res = {
                    status: 404,
                    message: `User with name ${user.firstName} ${user.lastName}, does not exist`,
                };
            }
            else {
                yield this.userRepository.save(Object.assign({}, userToUpdate, user));
                res = {
                    status: 200,
                    message: `L'utilisateur a été mis à jours`,
                };
            }
            return res;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new users_entity_1.UserEntity();
            Object.assign(newUser, user);
            const err = yield class_validator_1.validate(newUser);
            let res;
            if (err.length > 0) {
                res = {
                    status: 400,
                    message: 'Mauvaises entrées',
                };
            }
            else {
                yield this.userRepository.save(newUser);
                res = { status: 200, message: "L'utilisateur a été ajouté" };
            }
            return res;
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map