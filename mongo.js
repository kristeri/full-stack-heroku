const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://fullstackroot:${password}@cluster0-jadra.mongodb.net/person-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (password && personNumber && personNumber) {
  const person = new Person({
    name: personName,
    number: personNumber
  });

  person.save().then(response => {
    console.log(`Added ${personName} number ${personNumber} to phonebook.`);
    mongoose.connection.close();
  });
} else if (password) {
  console.log("Phonebook:");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  console.log("Invalid command.");
  mongoose.connection.close();
}
