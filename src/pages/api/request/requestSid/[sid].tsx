import { ObjectID } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../../../utils/database'

interface ErrorResponseType {
    error: string
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {


    if (req.method === "GET") {
        const { sid } = req.query;

        if (!sid) {
            res.status(400).json({ error: 'Missing sid' });
            return;
        }

            const { db } = await connect();

            const response = await db.collection('requests').find({ sid }).toArray();
            if (!response || response.length == 0) {
                res.status(400).json({ error: "SID not found" });
                return;
            }
            res.status(200).json(response);
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

