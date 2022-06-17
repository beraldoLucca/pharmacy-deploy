import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../../utils/database'

interface ErrorResponseType {
    error: string
}

interface SucessResponseType {
    _id: string;
    cns: string;
    cpf: string;
    name: string;
    age: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {


    if (req.method === "GET") {
        const { cns } = req.query;
        // const { cpf } = req.query;
    

        if (!cns) {
            res.status(400).json({ error: 'Missing cns and CPF' });
            return;
        }
            const { db } = await connect();

            const response = await db.collection('clients').findOne({ cns });

            if (!response) {
                res.status(400).json({ error: "CNS not found" });
                return;
            }
            res.status(200).json(response);
        
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

