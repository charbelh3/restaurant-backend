const express = require("express");
const router = express.Router();
const categoryItemsController = require('../Controllers/categoryItems');

router.get('/getCategoryItems', categoryItemsController.GetCategoryItems)