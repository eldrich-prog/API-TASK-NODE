"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.user.findMany();
    res.json(products);
}));
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = yield prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email
        }
    });
    res.status(201).json({ message: 'User created', newClient });
}));
router.put('/user', (req, res) => {
    res.send('Put request');
});
exports.default = router;
