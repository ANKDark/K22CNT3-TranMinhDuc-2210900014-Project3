import PropTypes from "prop-types";

export default function TmdEditUserForm({
  tmdName,
  setTmdName,
  tmdEmail,
  setTmdEmail,
  tmdPassword,
  setTmdPassword,
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
              <strong>Chỉnh sửa người dùng</strong>
            </h5>
            <button type="button" className="btn-close bg-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="d-flex justify-content-center mb-3 bg-danger p-2 rounded bg-opacity-50">
                <span className="fs-5">
                  <strong>{error}</strong>
                </span>
              </div>
            )}
            <form onSubmit={tmdHandleSubmit} className="m-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0 p-2 rounded"
                    placeholder="Họ và tên"
                    value={tmdName}
                    onChange={(e) => setTmdName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control bg-secondary text-white border-0 p-2 rounded"
                    placeholder="Email"
                    value={tmdEmail}
                    onChange={(e) => setTmdEmail(e.target.value)}
                    required
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <input
                    type="password"
                    className="form-control bg-secondary text-white border-0 p-2 rounded"
                    placeholder="Mật khẩu mới (bỏ trống nếu không đổi)"
                    value={tmdPassword}
                    onChange={(e) => setTmdPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-warning w-100 rounded-pill">
                    Cập nhật thông tin
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

TmdEditUserForm.propTypes = {
  tmdName: PropTypes.string.isRequired,
  setTmdName: PropTypes.func.isRequired,
  tmdEmail: PropTypes.string.isRequired,
  setTmdEmail: PropTypes.func.isRequired,
  tmdPassword: PropTypes.string.isRequired,
  setTmdPassword: PropTypes.func.isRequired,
  tmdHandleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string,
};
