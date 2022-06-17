import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SucessResponseType {
  _id: string;
  name: string;
  quantity: number;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {

  if (req.method === "GET") {

    const { db } = await connect();

    const response = await db.collection('medicines').find().toArray();

    res.status(200).json(response);
  }
  else {
    res.status(400).json({ error: 'Wrong request Method' });
  }
}
