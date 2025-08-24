import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("MongoDB Connected");
    })

   await mongoose.connect(`${process.env.MONGO_URL}/shopHive`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

}

export default connectDB