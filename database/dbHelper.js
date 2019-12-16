const db=require('./dbConfig.js');

function insert(user){
  return db('users').insert(user);
}

function findBy(filter){
  return db('users').where(filter);
}
function findById(id){
  return db('users').where({id}).first();
}
async function remove(user){
const [id]=await db('users').insert(user);
  return findById(id);
}
module.exports={insert, remove, findById, findBy}
