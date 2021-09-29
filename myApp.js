require('dotenv').config({ path: './sample.env'});
//importamos el modulo node de mongoose
var mongoose =  require('mongoose');

//conectamos la app con mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//crea un esquema de mongoose, este mapea por una coleccion de mongo y define la forma que tendra los documentos dentro de esa coleccion
let personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: Array,
})


//se crea un modelo, para esto hay que tranfomar el schema en un modelo usando el metodo que se ve a continuacion, la sintaxis es mongoose.model(modelName, schema)
let Person = mongoose.model('Person', personSchema) ;


const createAndSavePerson = (done) => {
  //se crea un instancia del contructor Person que se creo anteriormente
  let person = new Person({name: 'hola', age: 18, favoriteFoods: ['sandia', 'jajaj']})
  //una vez creado, se usa el metodo save de la instancia y se le pasa un callback
  person.save((err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

//aqui se usa la sintaxis Model.create(array, handler), este se utiliza para crear muchas instancias de tus modelos, esto seria igual a crear una instancia con new Model({name: 'name', ...}), solo que aqui se crean mas de una
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

//hola