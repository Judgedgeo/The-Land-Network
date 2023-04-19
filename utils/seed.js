const connection = require('../config/connection');
const { User, Thought } = require('../models');
const reactionSchema = require('../models/Reaction');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});
// array to hold users
    const users = [];

    for (let i = 0; i< 20; i++) {

        const thoughts = createThought(20);

        const username = getUsers();
        const userThoughts = getThoughts();

        users.push({
            thoughts,
            username,
            userThoughts,
        });
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertOne({
    thoughtText: 'test',
    createdAt: 'test',
    username: 'test',
    reactions: [...reactionSchema]
});

console.table(users);
console.info('Seeding complete! 🌱');
process.exit(0);
})