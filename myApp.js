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

//aqui se usa la sintaxis Model.create(array, handler), este se utiliza para crear muchas instancias de tus modelos, esto seria igual a crear una instancia con new Model({name: 'name', ...}), solo que aqui se pueden crear mas de una
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

//aqui se utiiza el metodo Model.find(jsonObject, callback), este lo que hace es devolver un array que encaje con la busqueda, en este caso devolvera un array que contenga todos los objetos en el que su propiedad name sea igual a personName, y al igual que los anteriores, recibe un callback como segundo argumento
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

//aqui se utiliza un metodo similar al metodo Model.find({ key: value}, handler), solo que este solo retorna un documento (no un array), incluso si existe mas de un item. Es muy util cuando buscas propiedades que has declarado como unicas
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food }, (err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

//aqui se usa el metodo findById para buscar por id, la sintaxis es similar a find y findOne
const findPersonById = (personId, done) => {
  Person.findById({_id: personId }, (err, data) => 
    err ? console.log(err) : done(null, data)
  )
};

//aqui se usa los conocimientos previos para actualizar un dato, en este caso se va a añadir una comida al array favoriteFoods
const findEditThenSave = (personId, done) => {
  //creamos la vairable que se va a añadir
  const foodToAdd = "hamburger";
  //se usa el metodo findById para buscar a la persona correspondiete, para que luego el handler haga de las suyas, si no se encuentra se usa el argumento err, si si se usa el argumento que devuelve la data (person) que encaje con el primer argumento ({ _id: personId })
  Person.findById({ _id: personId, }, (err, person) => {
    //person.favoriteFoods.push(foodToAdd)
    let { favoriteFoods } = person
    //si se encuentra el id, osea que no hay ningun error, se va a añadir la variable de la comida al array favoriteFoods
    favoriteFoods.push(foodToAdd)
    //una vez añadido se guarda esa persona para que se actualize y no perder esa configuracion
    person.save((err, person) => {
      done(null, person)
    })

  })
};

//en este se actualizara un dato al igual que el anterior, pero aqui se utilizara findOneAndUpdate
const findAndUpdate = (personName, done) => {
  //se define la variable con la que se actializara el dato
  const ageToSet = 20;
  //de las instancias creadas con la classe Person
  Person
    //busca a una persona que tenga el nombre personName (primer argumento) (en este caso no es necesario poner { key: value } ya que se puede poner solo value (personName) pero ambos funcionan, luego si se encuentra actualiza la propiedad que se requiera (en este case age) con la variable que se creo (ageToSet) (esto se hace en el segundo argumento), (en el tercer argumento) para que se actualize los datos, se debe poner lo que se ve en el 3er argumento ({ new: true }), ya que por defecto estos metodos devuelven el objeto sin modificar
    .findOneAndUpdate(personName, { age: ageToSet}, { new: true }, (err, person) => {
    if (err) return console.log(err)
    done(null, person)
  })
};

//este es similar al anterior
const removeById = (personId, done) => {
  //de las instancias de Person
  Person
    //encuantra a la persona con id=personId, si la encuentra has lo que dice el metodo findByIdAndRemove
    .findByIdAndRemove(personId /*{ _id: personId }*/, (err, personToRemove) => {
      done(null, personToRemove)
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, personToRemove) => {
    done(null, personToRemove);
  })
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