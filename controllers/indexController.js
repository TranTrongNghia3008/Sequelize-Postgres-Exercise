'use strict';

const controller = {};
const { where } = require('sequelize');
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
controller.showBolgs = async (req, res) => {
    let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
    let tag = isNaN(req.query.tags) ? 0 :parseInt(req.query.tags);
    let keyword = req.query.keyword || ''
    let categories = await models.Category.findAll({
        include: [{
            model: models.Blog
        }]
    });
    res.locals.categories = categories;

    let tags = await models.Tag.findAll();
    res.locals.tags = tags;

    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

    let options = {
        attributes: ['id', 'title', 'imagePath', 'summary', 'categoryId', 'createdAt'],
        where: {}
    }
    if (category > 0) {
        options.where.categoryId = category;
    }

    if (tag > 0) {
        options.include = [{
            model: models.Tag,
            where: { id: tag}
        }];
    }

    if (keyword.trim() != '') {
        options.where.title = {
            [Op.iLike]: `%${keyword}%`
        }
    }

    if (!options.include) {
        options.include = [];
    }
    
    options.include.push({ 
        model: models.Comment,
        attributes: ['blogId']
    });

    const limit = 2;
    options.limit = limit;
    options.offset = limit * (page - 1);
    const {rows, count} = await models.Blog.findAndCountAll(options);

    res.locals.pagination = {
        page: page, 
        limit: limit,
        totalRows: count, 
        queryParams: req.query
    }

    res.locals.blogs = rows;
    res.render('index');
}


module.exports = controller;