import { useSearchParams } from "react-router-dom";

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const handleParamsClick = (
    name: string,
    value: string | string[] | number,
    replace?: boolean,
  ) => {
    if (Array.isArray(value)) {
      if (value.length > 0) newSearchParams.set(name, value.join(","));
      else newSearchParams.delete(name);
    } else if (value) {
      newSearchParams.set(name, value.toString());
      setSearchParams(newSearchParams, { replace });
    }
  };

  const handleParamDelete = (name: string, replace?: boolean) => {
    newSearchParams.delete(name);
    setSearchParams(newSearchParams, { replace });
  };

  const handleParamsDeleteAll = (replace?: boolean) => {
    newSearchParams.forEach((key) => newSearchParams.delete(key));
    setSearchParams(newSearchParams, { replace });
  };

  const handlePageClick = (page: number) => {
    handleParamsClick("page", page);
  };

  return {
    searchParams,
    handlePageClick,
    handleParamsClick,
    handleParamDelete,
    handleParamsDeleteAll,
  };
};
