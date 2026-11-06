export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  descriptionBn: string;
}

export interface IBazarPrice {
  bazarName: string;
  price: number;
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  unitNameBn: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  bazarPrices: IBazarPrice[];
  lastUpdated: string;
  descriptionBn: string;
}