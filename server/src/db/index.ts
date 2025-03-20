import mongoose from "mongoose";

export const connectDB = async () => {
   

    try {
        let db_connection_string = "";
        
        if(process.env.NODE_ENV === "development"){
            db_connection_string = process.env.MONGO_LOCAL_URI!;
        }

        if(process.env.NODE_ENV === "production"){
            db_connection_string =  process.env.MONGO_ONLINE_URI!
        }

        const dbResponse = await mongoose.connect(db_connection_string);
        console.log("DB connection is success.", dbResponse.connection.host);
        
    } catch (error) {
        console.log("DB connection error." , error);
        process.exit(1);
    }
}