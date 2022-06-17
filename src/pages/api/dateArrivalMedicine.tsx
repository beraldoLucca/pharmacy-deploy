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

    const { db } = await connect();

    if (req.method === "POST") {

        const response = await db.collection('dateArrivalMedicine').insertOne({
                date: new Date()
            });
            res.status(200).json(response.ops[0]);
            return;

    }
}
