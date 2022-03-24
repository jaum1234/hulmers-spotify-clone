"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PlaylistController_1 = __importDefault(require("../../controllers/PlaylistController"));
const router = express_1.default.Router();
router.get('/:id', PlaylistController_1.default.getPlaylist);
router.post('/:id/tracks/:trackId', PlaylistController_1.default.addTrack);
router.delete('/:id/tracks/:trackId', PlaylistController_1.default.removeTrack);
exports.default = router;
