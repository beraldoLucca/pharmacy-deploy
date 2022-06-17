import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../../utils/database'

interface ErrorResponseType{
    error: string
}

interface SucessResponseType{
    _id: string;
    name: string;
}

export default async(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {
    

    if(req.method === "GET"){
        const{ name } = req.body;

        if(!name){
            res.status(400).json({error: 'Missing medicine name'});
            return;
        }

        const {db} = await connect();

        const response = await db.collection('medicines').findOne({ name });

        if(!response){
            res.status(400).json({ error: "name not found"});
            return;
        }
        res.status(200).json(response);
    }
    
    else{
        res.status(400).json({error: 'Wrong request Method'});
        }
    }

