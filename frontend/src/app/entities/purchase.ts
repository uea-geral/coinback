export interface Purchase {
  userId: string;
  id: string;
  value: number;
  product_name: string;
}

export type Purchase2Create = Omit<Purchase, "id" | "userId">;
