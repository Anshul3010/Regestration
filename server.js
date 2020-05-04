const dotenv  =  require('dotenv');
const mongoose = require('mongoose'); 

dotenv.config({path:'./config.env'});
const app = require('./app');

const db = process.env.DATABASE_LOCAL;

mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connrction successful');
  })
  .catch(err =>
    console.log('wait time expired no internet error name : ', err.name)
  );

  app.listen(5000,()=>{
      console.log('server is running on port 5000');
  });
