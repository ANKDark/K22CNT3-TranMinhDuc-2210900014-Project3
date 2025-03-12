import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { format, parseISO } from 'date-fns';

export default function TmdListBudgets({ tmdListBudgets, tmdHandleEdit, tmdHandleDelete }) {
  const [tmdCurrentPage, setTmdCurrentPage] = useState(0);
  const tmdItemsPerPage = 9;

  const tmdOffset = tmdCurrentPage * tmdItemsPerPage;
  const tmdCurrentItems = tmdListBudgets.slice(tmdOffset, tmdOffset + tmdItemsPerPage);
  const tmdPageCount = Math.ceil(tmdListBudgets.length / tmdItemsPerPage);

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
            <th>Người dùng</th>
            <th>Danh mục</th>
            <th>Giới hạn chi tiêu</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tmdCurrentItems.length > 0 ? (
            tmdCurrentItems.map((tmdBudget, index) => (
              <tr key={tmdBudget.id}>
                <td className="text-center text-light">{index + 1}</td>
                <td className="text-center text-light">{tmdBudget.tmdUser.tmdName}</td>
                <td className="text-center text-light">{tmdBudget.tmdCategory !== null ? tmdBudget.tmdCategory.tmdName : "Không có danh mục"}</td>
                <td className="text-center text-light fw-bold text-warning">
                  {tmdBudget.tmdAmountLimit.toLocaleString()}
                </td>
                <td className="text-center text-light">{formatDate(tmdBudget.tmdStartDate)}</td>
                <td className="text-center text-light">{formatDate(tmdBudget.tmdEndDate)}</td>
                <td className="text-center">
                  <button className="btn btn-outline-info me-2" onClick={() => tmdHandleEdit(tmdBudget)}>Sửa</button>
                  <button className="btn btn-outline-danger" onClick={(e) => tmdHandleDelete(tmdBudget.id, e)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Không có ngân sách nào!</td>
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

TmdListBudgets.propTypes = {
  tmdListBudgets: PropTypes.array.isRequired,
  tmdHandleEdit: PropTypes.func.isRequired,
  tmdHandleDelete: PropTypes.func.isRequired,
};
