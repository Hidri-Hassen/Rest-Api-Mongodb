const express = require('express')
const assert = require('assert');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
app.use(express.json());

const mongoURI =
  'mongodb+srv://hassen:hidri83@clusterhidri-5nclw.mongodb.net/test?retryWrites=true&w=majority';
const dataBase = 'Contact-List';

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, 'connection to database failed');

  const db = client.db(dataBase);

  app.post('/add_contact', (req  ,res)=>{
      let newContact = req.body;
      db.collection('contacts').insertOne(newContact,(err,data)=>{
          err?console.log('Cannot Add Contact'):res.send(data);
      })
  })

  app.get('/contacts', (req  ,res)=>{
  
    db.collection('contacts').find().toArray((err,data)=>{
        err?console.log('Cannot Get Contact'):res.send(data);
    })
})

app.delete('/delete_contact/:id', (req  ,res)=>{
  let contact=req.params.id
    db.collection('contacts').findOneAndDelete({_id:ObjectID(contact)}, (err,data)=>{
        err?console.log('Cannot Delete Contact'):res.send('Contact Deleted');
    })
})

app.put('/edit_contact/:id', (req  ,res)=>{
    let contact=req.params.id
      db.collection('contacts').findOneAndUpdate({_id:ObjectID(contact)},{$set : req.body} ,(err,data)=>{
          err?console.log('Cannot Edit Contact'):res.send('Contact Edited');
      })
  })





});










const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  err ? console.log('error') : console.log(`server is running on port : ${port}...`);
});

