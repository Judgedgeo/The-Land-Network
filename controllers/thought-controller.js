const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.statu(500).json(err);
        }
    },


    async getSingleThought(req, resp) {
        try {
            constdbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);

            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userID },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }

            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(dbThoughtData);

        console.log(err);
        res.status(500).json(err);
    },

    async deleteThought(req, res) {
        try {
            constdbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }


            const dbUserData = User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughId } },
                { new: true }
            );

            if (!dbUsertData) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thouthId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            constdbThoughtData = awaitThought.findOneAndUpdate(
                { _id: req.params.thouthId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = thoughtController;


