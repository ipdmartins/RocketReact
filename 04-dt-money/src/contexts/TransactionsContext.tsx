import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../libs/axios";

interface TransactionType {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface createTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: TransactionType[];
  fetchTransacions: (query?: string) => Promise<void>;
  createTransaction: (data: createTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchTransacions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function createTransaction(data: createTransactionInput) {
    const { category, description, price, type } = data;

    const resp = await api.post("transactions", {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, resp.data]);
  }

  useEffect(() => {
    fetchTransacions();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransacions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
