import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

const searchFormSchema = zod.object({
  query: zod.string(),
});
type searchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { fetchTransacions } = useContext(TransactionContext);
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
