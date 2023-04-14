const express = require("express")
const router = express.Router()
const Product = require("../model/productModel")

router.get("/get-products", async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.get("/get-products/men", async (req, res) => {
    try {
        const products = await Product.find({ category: "men's clothing" })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.get("/get-products/women", async (req, res) => {
    try {
        const products = await Product.find({ category: "women's clothing" })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.get("/get-products/other", async (req, res) => {
    try {
        const products = await Product.find({ $or: [{ category: "jewelery" }, { category: "electronics" }] })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.post("/get-products/filters", async (req, res) => {
    try {
        const { price, rating } = req.body
        console.log(price, rating)
        const products = await Product.find({ $and: [{ price: { $gt: price } }, { "rating.rate": { $gt: rating } }] })
        console.log(products.length)
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.post("/get-products/filters-men", async (req, res) => {
    try {
        const { price, rating } = req.body
        const products = await Product.find({ $and: [{ category: "men's clothing" }, { price: { $gt: price } }, { "rating.rate": { $gt: rating } }] })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.post("/get-products/filters-women", async (req, res) => {
    try {
        const { price, rating } = req.body
        const products = await Product.find({ $and: [{ category: "women's clothing" }, { price: { $gt: price } }, { "rating.rate": { $gt: rating } }] })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.post("/get-products/filters-other", async (req, res) => {
    try {
        const { price, rating } = req.body
        const products = await Product.find({ $and: [{ $or: [{ category: "jewelery" }, { category: "electronics" }] }, { price: { $gt: price } }, { "rating.rate": { $gt: rating } }] })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

router.post("/create-product", async (req, res) => {
    try {
        const { title, price, description, category, image, rate, count } = req.body
        const products = await Product.create({
            title, price, description, category, image, rating: { rate, count }
        })
        return res.status(200).json({
            status: "success",
            products
        })
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err
        })
    }
})

module.exports = router