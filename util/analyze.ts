type AnalyzeType = {
  fen: string;
  depth?: number;
};

interface StockfishResponse {
  success: boolean;
  evaluation: number;
  mate: number | null;
  bestmove: string;
  continuation: string;
}

export default async ({ fen, depth = 10 }: AnalyzeType) => {
  const response = await fetch(
    `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`
  );
  const data: StockfishResponse = await response.json();
  return data;
};
