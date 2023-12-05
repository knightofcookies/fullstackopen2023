const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log("Give proper arguments");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Syl:${password}@ladcluster.6hgwf.mongodb.net/fsopen-phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    phone: String,
});

const Entry = mongoose.model("Entry", entrySchema);

if (process.argv.length == 3) {
    Entry.find({}).then(result => {
        result.forEach(entry => console.log(entry));
        mongoose.connection.close();
        process.exit(0);
    })
}
else {
    const name = process.argv[3];
    const phone = process.argv[4];

    const entry = new Entry({
        name: name,
        phone: phone,
    });

    entry.save().then(result => {
        console.log(`added ${result.name} number ${result.phone} to phonebook`);
        mongoose.connection.close();
    });
}