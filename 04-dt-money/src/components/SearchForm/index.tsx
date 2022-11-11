import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const searchFormSchema = zod.object({
  query: zod.string(),
});
type searchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
  //changed original React useContext to the library use-context-selector
  const fetchTransacions = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransacions;
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: searchFormInputs) {
    await fetchTransacions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busca por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
