const Category = require('../../models/Category');

module.exports = {
    async index(req,res) {
        const category = await Category.findAll({raw:true});

        return res.json(category);
    },
    async addCategory(req,res) {
        const {name} = req.body;

        const category = await Category.create({name});

        return res.sendStatus(200);

    },
}