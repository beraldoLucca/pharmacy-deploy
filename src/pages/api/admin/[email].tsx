import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../../utils/database'

interface ErrorResponseType {
    error: string
}

interface SucessResponseType {
    email: string,
    pwd: string,
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {


    if (req.method === "POST") {
        const { email } = req.query;
        const { pwd } = req.body;
    

        if (!email) {
            res.status(400).json({ error: 'Missing cns and CPF' });
            return;
        }
            const { db } = await connect();

            const response = await db.collection('admin').findOne({ email: email});

            if (!response) {
                res.status(400).json({ error: "PWD not found" });
                return;
            }
            res.status(200).json(response);
        
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

