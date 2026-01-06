import mongoose from "mongoose"

 const connectDb = async(url)=>{
    try{
        const con = await mongoose.connect(url)
        console.log(`Mongodb connected: ${con.connection.name}`);

    }
    catch(error){
        console.error("error in connecting to the database")
        process.exit(1)

    }
}

export default connectDb;