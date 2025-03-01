import { Chess } from "chess.js";

export default function (moves: string[]) {
  try {
    if (!(moves.length > 0)) {
      return { fen: "", error: "The moves list is empty." };
    } else {
      const chess = new Chess();
      moves.forEach((move) => chess.move(move));

      return { fen: chess.fen(), error: null };
    }
  } catch (error) {
    return { fen: "", error: error };
  }
}
