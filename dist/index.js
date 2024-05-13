"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
// const 
const PORT = 3000;
const app = (0, express_1.default)();
// JSON
app.use(express_1.default.json());
// ROUTES
app.use('/api', user_routes_1.default);
app.use('/api', post_routes_1.default);
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
exports.default = app;
