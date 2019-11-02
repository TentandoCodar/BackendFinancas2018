const Category = require('../../models/Category');
const Expenses = require('../../models/Expenses');

module.exports = {
    async index(req,res) {
        const category = await Category.findAll({raw:true});

        return res.json(category);
    },
    async addCategory(req,res) {
        const {name} = req.body;
        if(!name) {
            return res.sendStatus(400);
        }

        const category = await Category.create({name});

        return res.sendStatus(200);

    },
    async update(req,res) {
        const {name,id} = req.body;
        if(!name) {
            return res.sendStatus(400);
        }
        const category = await Category.update(
            {name: name},
            {where: {id: id}}
        )

        res.sendStatus(200);
    },
    async delete(req,res) {
        const {id} = req.body;
        
        await Expenses.destroy({
            where: {
                category_id: id
            }
        })
        await Category.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(200);
    }
}