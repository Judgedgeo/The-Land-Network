const { User, Thought } = require('../models');
//Find Users

const userController = {

    async getUsers(req, res) {
        try {
            const dbUserData = await User.find({})
                .select('-__v')

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Get a single User

    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId })
                .select('__V')
                .populate('friends')
                .populate('username')
                .populate('thoughts');

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Create a User

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true,
                }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Delete a User

    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId })

            if (!dbUserData) {
                return res.status(404).json({ message: ' No user with this id!' });
            }


            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a Friend

    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });


            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this Id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Remove a Friend

    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;