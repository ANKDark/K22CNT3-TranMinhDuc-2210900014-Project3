import PropTypes from "prop-types";

export default function TmdUpdateCategoryForm({
  tmdName,
  setTmdNameUpdate,
  tmdType,
  setTmdTypeUpdate,
  tmdHandleSubmit,
  onClose,
  error,
}) {
  return (
    <div className="modal fade show d-block bg-secondary p-2 text-dark bg-opacity-50" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" style={{ minWidth: "700px" }}>
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title ms-4">
              <strong>Cập nhật danh mục</strong>
            </h5>
            <button
              type="button"
              className="btn-close bg-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="d-flex justify-content-center mb-3 bg-danger p-2 rounded bg-opacity-50">
                <span className="fs-5"><strong>{error}</strong></span>
              </div>
            )}
            <form onSubmit={tmdHandleSubmit} className="m-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0 p-2 rounded"
                    placeholder="Tên danh mục"
                    value={tmdName}
                    onChange={(e) => setTmdNameUpdate(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <select
                    className="form-select bg-secondary text-white border-0 p-2 rounded"
                    value={tmdType}
                    onChange={(e) => setTmdTypeUpdate(e.target.value === "true")}
                  >
                    <option value="true">Thu nhập</option>
                    <option value="false">Chi tiêu</option>
                  </select>
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-secondary w-100 rounded-pill">
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

TmdUpdateCategoryForm.propTypes = {
  tmdName: PropTypes.string.isRequired,
  setTmdNameUpdate: PropTypes.func.isRequired,
  tmdType: PropTypes.bool.isRequired,
  setTmdTypeUpdate: PropTypes.func.isRequired,
  tmdHandleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
