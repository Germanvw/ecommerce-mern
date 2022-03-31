import { useEffect } from "react";
import { inputProps } from "../../Items/Modals/Product/imports";
import { useDispatch, useSelector } from "react-redux";
import { startProdFetchAll } from "../../redux/actions/productActions";
import { ProductModal } from "../../Items/Modals/Product/ProductModal";
import { ProductTable } from "../../Items/Tables/ProductTable";
import { uiOpenModalProduct } from "../../redux/actions/uiActions";
import { FormInput } from "../../Items/Forms/FormInput";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../Items/Buttons/Pagination";
import { DropdownPagination } from "../../Items/Forms/Dropdown";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { RootState } from "../../redux/reducer/rootReducer";

export const Products = () => {
  const { productList } = useSelector((state: RootState) => state.prod);
  const dispatch = useDispatch();

  // Hooks
  const {
    perPage,
    handlePagination,
    pagination,
    handlePerPage,
    setPagination,
    setPerPage,
  }: any = usePagination();

  const { filterInput, handleChange, paginatedArray, array }: any =
    useFilterSearch(pagination, perPage, productList);

  //Effects
  useEffect(() => {
    dispatch(startProdFetchAll());
  }, []);

  const handleCreate = () => {
    dispatch(uiOpenModalProduct());
  };

  return (
    <div className="table-bg">
      <div className="table-body">
        <div className="header">
          <FormInput
            value={filterInput}
            handleChange={handleChange}
            {...inputProps}
          />
          <button onClick={handleCreate}>Create new</button>
        </div>
        <div className="table">
          <ProductTable products={paginatedArray} />
        </div>
        <div className="bottom">
          <div className="total">{`Products found: ${
            array && array.length
          }`}</div>
          <Pagination
            length={array.length}
            perPage={perPage}
            handlePagination={handlePagination}
            pagination={pagination}
            setPagination={setPagination}
          />
          <div className="perPage">
            <DropdownPagination
              dwName="perPage"
              handleChange={handlePerPage}
              options={[5, 10, 15, 20]}
              setPerPage={setPerPage}
            />
          </div>
        </div>
        <ProductModal />
      </div>
    </div>
  );
};
