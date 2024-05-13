"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
class Httpresponse {
    constructor(router) {
        this.router = router;
    }
}
user_routes_1.default.post('/post', (req, res) => {
    res.send('Post request');
});
user_routes_1.default.get('/post', (req, res) => {
    res.send('Get request');
});
user_routes_1.default.put('/post', (req, res) => {
    res.send('Put request');
});
user_routes_1.default.delete('/post', (req, res) => {
    res.send('Delete request');
});
exports.default = user_routes_1.default;
