import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { format, parseISO } from "date-fns";

export default function TmdListSaving({ tmdListSaving, tmdHandleEdit, tmdHandleDelete }) {
  const [tmdCurrentPage, setTmdCurrentPage] = useState(0);
  const tmdItemsPerPage = 9;

  const tmdOffset = tmdCurrentPage * tmdItemsPerPage;
  const tmdCurrentItems = tmdListSaving.slice(tmdOffset, tmdOffset + tmdItemsPerPage);
  const tmdPageCount = Math.ceil(tmdListSaving.length / tmdItemsPerPage);

  const handlePageClick = ({ selected }) => {
    setTmdCurrentPage(selected);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy");
  };

  return (
    <>
      <table className="table table-dark table-hover text-center rounded-3 overflow-hidden">
        <thead>
          <tr>
            <th>#</th>
            <th>Người dùng</th>
            <th>Tên mục tiêu</th>
            <th>Mục tiêu số tiền</th>
            <th>Đã đạt được số tiền</th>
            <th>Hạn mục tiêu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tmdCurrentItems.length > 0 ? (
            tmdCurrentItems.map((tmdSaving, index) => (
              <tr key={tmdSaving.id}>
                <td className="text-light">{index + 1}</td>
                <td className="text-light">{tmdSaving.tmdUser.tmdName}</td>
                <td className="text-light">{tmdSaving.tmdGoalName}</td>
                <td className="text-light">
                  {tmdSaving.tmdTargetAmount.toLocaleString()}
                  <i className="bi bi-currency-dollar text-success"></i>
                </td>
                <td className="text-light">
                  {tmdSaving.tmdSavedAmount.toLocaleString()}
                  <i className="bi bi-currency-dollar text-success"></i>
                </td>
                <td className="text-light">{formatDate(tmdSaving.tmdTargetDate)}</td>
                <td>
                  <button className="btn btn-outline-info me-2" onClick={() => tmdHandleEdit(tmdSaving)}>
                    Sửa
                  </button>
                  <button className="btn btn-outline-danger" onClick={(e) => tmdHandleDelete(tmdSaving.id, e)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Không có khoản tiết kiệm nào!
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

TmdListSaving.propTypes = {
  tmdListSaving: PropTypes.array.isRequired,
  tmdHandleEdit: PropTypes.func.isRequired,
  tmdHandleDelete: PropTypes.func.isRequired,
};
