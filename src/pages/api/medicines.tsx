import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
    error: string
}

interface SucessResponseType {
    _id: string;
    name: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {

    

    const { name, quantity } = req.body;

    

    //   const newMedicine = {
    //     name,
    //     quantity,
    //   }


    if (!name) {
        res.status(400).json({ error: 'Por favor, insira o nome do remédio' });
        return;
    }

    const { db } = await connect();

    const medicineNameExists = await db
        .collection('medicines')
        .findOne({ name: name })

    if (req.method === "POST") {

        if (!medicineNameExists) {
            const response = await db.collection('medicines').insertOne({
                name,
                quantity
            });
            res.status(200).json(response.ops[0]);
            return;
        }
        else{
            res.status(400).json({ error: 'Nome já existente' });
            return;
        } 
    }

    else {
        if (req.method === "PUT") {
            if (medicineNameExists) {
                await db.collection('medicines').updateOne({ name: name }, { $set: { quantity: quantity } });
                res.status(200).json(name);
                return;
            }
        }

        res.status(400).json({ error: 'Wrong request Method' });
    }
}
