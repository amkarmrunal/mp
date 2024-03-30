const mongoose =  require('mongoose')



const connectToMongoDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/mrunal', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  // Call the connectToMongoDB function to initiate the connection
connectToMongoDB();
    

require('./employee.model')