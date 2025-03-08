import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { format, parseISO } from 'date-fns';

export default function TmdListTransaction({ tmdListTransaction, tmdHandleEdit, tmdHandleDelete }) {
  const [tmdCurrentPage, setTmdCurrentPage] = useState(0);
    const tmdItemsPerPage = 9;
  
    const tmdOffset = tmdCurrentPage * tmdItemsPerPage;
    const tmdCurrentItems = tmdListTransaction.slice(tmdOffset, tmdOffset + tmdItemsPerPage);
    const tmdPageCount = Math.ceil(tmdListTransaction.length / tmdItemsPerPage);
  
    const handlePageClick = ({ selected }) => {
      setTmdCurrentPage(selected);
    };
  
    const formatDate = (dateString) => {
      const date = parseISO(dateString);
      return format(date, 'dd/MM/yyyy');
    };

  return (
    <>
    <table className="table table-dark table-hover text-center rounded-3 overflow-hidden">
      <thead>
        <tr>
          <th>#</th>
          <th>Số tiền</th>
          <th>Ngày giao dịch</th>
          <th>Danh mục</th>
          <th>Ghi chú</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {tmdCurrentItems.length > 0 ? (
          tmdCurrentItems.map((tmdTrans, index) => (
            <tr key={tmdTrans.id}>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{tmdTrans.tmdAmount.toLocaleString()} <i className="bi bi-currency-dollar text-primary"></i></td>
              <td className="text-light">{formatDate(tmdTrans.tmdTransactionDate)}</td>
              <td className="text-light">
                {tmdTrans.tmdCategory !== null ? tmdTrans.tmdCategory.tmdName : "Không có danh mục"}
              </td>
              <td className="text-light">{tmdTrans.tmdNote}</td>
              <td>
                <button className="btn btn-outline-info me-2" onClick={() => tmdHandleEdit(tmdTrans)}>
                  Sửa
                </button>
                <button className="btn btn-outline-danger" onClick={(e) => tmdHandleDelete(tmdTrans.id, e)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              Không có giao dịch nào!
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {tmdPageCount >= 1 && (
        <div className="mt-3">
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            pageCount={tmdPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-end"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link bg-dark text-white"} 
            previousClassName={"page-item"}
            previousLinkClassName={"page-link bg-dark text-white"} 
            nextClassName={"page-item"}
            nextLinkClassName={"page-link bg-dark text-white"} 
            breakClassName={"page-item"}
            breakLinkClassName={"page-link bg-dark text-white"} 
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

TmdListTransaction.propTypes = {
  tmdListTransaction: PropTypes.array.isRequired,
  tmdHandleEdit: PropTypes.func.isRequired,
  tmdHandleDelete: PropTypes.func.isRequired,
};
