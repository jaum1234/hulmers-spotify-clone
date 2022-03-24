"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../../controllers/AuthController"));
const router = express_1.default.Router();
router.get('', AuthController_1.default.getAuthorizationFromUser);
router.post('/token', AuthController_1.default.getToken);
router.post('/refresh-token', AuthController_1.default.getRefreshToken);
exports.default = router;
