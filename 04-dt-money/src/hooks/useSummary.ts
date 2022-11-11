import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useSummary() {
  //changed original React createContext to the library use-context-selector
  const transactions = useContextSelector(TransactionContext, (selector) => {
    return selector.transactions;
  });

  const summary = useMemo(() => {
    transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
