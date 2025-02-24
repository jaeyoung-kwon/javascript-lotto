export const MATCH_TO_RANK_TABLE = {
  3: { false: 5, true: 5 },
  4: { false: 4, true: 4 },
  5: { false: 3, true: 2 },
  6: { false: 1, true: 1 },
};

export const RANK_INFO_TABLE = {
  1: { price: 2_000_000_000, message: "6개 일치" },
  2: { price: 30_000_000, message: "5개 일치, 보너스 볼 일치" },
  3: { price: 1_500_000, message: "5개 일치" },
  4: { price: 50_000, message: "4개 일치" },
  5: { price: 5_000, message: "3개 일치" },
};
