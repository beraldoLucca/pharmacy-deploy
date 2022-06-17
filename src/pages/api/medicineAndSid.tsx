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

    

    const { nameMedicine, sid } = req.body;


    if (!nameMedicine || !sid) {
        res.status(400).json({ error: 'Por favor, insira o nome do remédio e seu SID' });
        return;
    }

    const { db } = await connect();

    const medicineNameExists = await db
        .collection('medicines')
        .findOne({ name: nameMedicine })

    if (req.method === "POST") {

        if (medicineNameExists) {
            const response = await db.collection('medicinesSid').insertOne({
                nameMedicine,
                sid
            });
            res.status(200).json(response.ops[0]);
            return;
        }
        else{
            res.status(400).json({ error: 'O remédio digitado não está cadastrado' });
            return;
        } 
    }

}
