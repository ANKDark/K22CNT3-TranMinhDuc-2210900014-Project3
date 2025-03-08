import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function TmdListCategory({ tmdListCategory, tmdHandleEdit, tmdHandleDelete }) {
  const [tmdCurrentPage, setTmdCurrentPage] = useState(0);
  const tmdItemsPerPage = 9;

  const tmdOffset = tmdCurrentPage * tmdItemsPerPage;
  const tmdCurrentItems = tmdListCategory.slice(tmdOffset, tmdOffset + tmdItemsPerPage);
  const tmdPageCount = Math.ceil(tmdListCategory.length / tmdItemsPerPage);

  const handlePageClick = ({ selected }) => {
    setTmdCurrentPage(selected);
  };

  return (
    <>
      <table className="table table-dark table-hover text-center rounded-3 overflow-hidden">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên danh mục</th>
            <th>Loại</th>
            <th>Người dùng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tmdCurrentItems.length > 0 ? (
            tmdCurrentItems.map((tmdCate, index) => (
              <tr key={tmdCate.id}>
                <td className="text-center text-light">{tmdOffset + index + 1}</td>
                <td className="text-center text-light">{tmdCate.tmdName}</td>
                <td className={`text-center ${tmdCate.tmdType ? "text-success fw-bold" : "text-danger fw-bold"}`}>
                  {tmdCate.tmdType ? "Thu nhập" : "Chi tiêu"}
                </td>
                <td className="text-center text-light">{tmdCate.tmdUser.tmdName}</td>
                <td className="text-center">
                  <button className="btn btn-outline-info me-2" onClick={() => tmdHandleEdit(tmdCate)}>Sửa</button>
                  <button className="btn btn-outline-danger" onClick={(e) => tmdHandleDelete(tmdCate.id, e)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Không có danh mục nào!</td>
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

TmdListCategory.propTypes = {
  tmdListCategory: PropTypes.array.isRequired,
  tmdHandleEdit: PropTypes.func.isRequired,
  tmdHandleDelete: PropTypes.func.isRequired,
};
