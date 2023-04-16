const connection = require('../config/connection');
const { Course, User } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Course.deleteMany({});

  // Drop existing User
  await User.deleteMany({});

  // Create empty array to hold the User
  const User = [];

  // Loop 20 times -- add User to the User array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    User.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add User to the collection and await the results
  await User.collection.insertMany(User);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    User: [...User],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
