import { Db } from "mongodb";
import { MongoClient } from "mongodb";

interface ConnectType{
    db: Db;
    user: MongoClient;
}

const user = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectType>{
    if(!user.isConnected()) await user.connect();

    const db = user.db('pharmacy')
    return {db, user}
}