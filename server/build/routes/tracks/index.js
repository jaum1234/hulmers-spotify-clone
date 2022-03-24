"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TrackController_1 = __importDefault(require("../../controllers/TrackController"));
const router = express_1.default.Router();
router.get('/recommendations', TrackController_1.default.getRecommendations);
router.get('/search', TrackController_1.default.search);
exports.default = router;
