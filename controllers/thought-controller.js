const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
                res.statu(500) / json(err);
            }
        },

async getSingleThought(req, resp){
    try {
constdbThoughtData = await Thought.findOne({ _id: req.params.thgouthId }):

if(!dbThoughtData) {
return res.status(404).json({ message: 'No thought with this id!' });
}
    }
}
    }
}