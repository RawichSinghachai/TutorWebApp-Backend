const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET

exports.findAll = async () => {
  await client.connect();
  const users = await client
    .db("database")
    .collection("user")
    .find({})
    .toArray();
  await client.close();
  return users;
};

exports.register = async (username, password, age, school, email) => {
  await client.connect();
  await client
    .db("database")
    .collection("user")
    .insertMany([
      {
        username: username,
        password: password,
        age: age,
        school: school,
        email: email,
        type: "Student",
        course: null,
      },
    ]);
  await client.close();
};

exports.login = async (username, password) => {
  try {
    await client.connect();
    const user = await client
      .db("database")
      .collection("user")
      .findOne({ $and: [{ username: username, password: password }] });
    await client.close();
    const token = jwt.sign({ username: user.username,email:user.email,course:user.course,type:user.type }, secret)
    return {status:'correct',token}
    

  } catch (error) {
    return {status:'incorrect'}
  }

};

exports.auth = async(token) => {
  try {
    const decoded = jwt.verify(token.split(' ')[1], secret);
    return {status:'success',decoded}
   
  } catch (error) {
    return {status:'error'}

  }
  
}

exports.update = async () => {
  await client.connect();
  await client
    .db("database")
    .collection("user")
    .updateOne(
      { username: "Jame" },
      { $set: { username: "Black", course: "pat1" } }
    );
  await client.close();
};
