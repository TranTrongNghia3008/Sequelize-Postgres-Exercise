'use strict';

const controller = {};
const { where } = require('sequelize');
const models = require('../models');

controller.showDetails = async (req, res) => {

    let categories = await models.Category.findAll({
        include: [{
            model: models.Blog
        }]
    });
    res.locals.categories = categories;

    let tags = await models.Tag.findAll();
    res.locals.tags = tags;


    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    let blog = await models.Blog.findOne({
        where: { id },
        attributes: ['id', 'title', 'imagePath', 'description', 'categoryId', 'createdAt'],
        include: [{
            model: models.User,
            atributes: ['firstName', 'lastName', 'imagePath', 'isAdmin']
        },{
            model: models.Comment,
            atributes: ['blogId']
        }, {
            model: models.Category
        }, {
            model: models.Tag
        }

    ]
    });
    res.locals.blog = blog;
    let admin = '';
    console.log('admin = ' + blog.User.isAdmin);
    if (blog.User.isAdmin == true) {
        admin = 'Admin';
    }

    res.locals.admin = admin;

    res.render('details');
}

module.exports = controller;