const dotenv = require('dotenv');
dotenv.config({ path: "../config.env" });
const fs = require('fs');
const Product = require("../model/productModel")
const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB Connection successful !!');
    });

// READ JSON FILE

const products = JSON.parse(fs.readFileSync(`${__dirname}/productData.json`, 'utf-8'));

// IMPORT DATA INTO DB

const importData = async () => {
    try {
        await Product.create(products)
        console.log('Data Successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM COLLECTIONS

const deleteData = async () => {
    try {
        await Tour.deleteMany(); // it will delete all such documents with similar kind of name
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data Successfully deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    // node import-dev-data.js --import
    importData();
} else if (process.argv[2] === '--delete') {
    // node import-dev-data.js --delete
    deleteData();
}
