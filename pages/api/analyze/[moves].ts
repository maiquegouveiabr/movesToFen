import { NextApiRequest, NextApiResponse } from "next";
import generateFenFromMoves from "../../../util/generateFenFromMoves";
import analyze from "../../../util/analyze";

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
    const stockfishData = await analyze({ fen: data.fen });
    moves.push(stockfishData.bestmove.split(" ")[1]);
    const updateFen = generateFenFromMoves(moves);

    res.send({
      ...stockfishData,
      moves: moves,
      newImageLink: encodeURI(
        `https://fen2image.chessvision.ai/${updateFen.fen}`
      ),
      previousImageLink: encodeURI(
        `https://fen2image.chessvision.ai/${data.fen}`
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
