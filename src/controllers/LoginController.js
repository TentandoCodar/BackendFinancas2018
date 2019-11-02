const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    async createUser(req,res) {
        const {email,password} = req.body;
        let passwordHash = "";
        bcrypt.genSalt(10,function(err,salt) {
            bcrypt.hash(password, salt, async function(err,hash) {
                passwordHash = hash;
                const user = await User.create({email,password:passwordHash},{raw:true});
                return res.json(user);
            })
        })


        
        
    },
    async login(req,res) {
        const {email,password} = req.body;

        const randomToken = crypto.randomBytes(32).toString('hex');

        const user = await User.findAll({where:{email},raw:true});
        
        if(user != '') {
            const passwordDB = user[0].password;
            bcrypt.compare(password, passwordDB, function(err,resp) {
                if(err) {
                    return res.sendStatus(400);
                }
                else {
                    if(resp === false) {
                        return res.sendStatus(400)
                    }
                    else{
                        res.json({randomToken})
                    }
                }
            })
        }
        else {
            return res.sendStatus(400);
        }

        
    },
    async destroyToken(req,res) {
        User.update({token: null}, {where: {token: req.body.token}});
        return res.sendStatus(200);
    }
    
}