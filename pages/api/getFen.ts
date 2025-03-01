import { NextApiRequest, NextApiResponse } from "next";
import generateFenFromMoves from "../../util/generateFenFromMoves";

export default async function getFen(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { moves } = req.query;

    moves = String(moves).split(",");
    if (!moves) {
      res.status(400).json({
        message: "Please provide some moves.",
      });
    }
    const data = generateFenFromMoves(Array.isArray(moves) ? moves : [moves]);
    if (data.error) {
      res.status(400).send(data.error);
    }
    res.send(data.fen);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
