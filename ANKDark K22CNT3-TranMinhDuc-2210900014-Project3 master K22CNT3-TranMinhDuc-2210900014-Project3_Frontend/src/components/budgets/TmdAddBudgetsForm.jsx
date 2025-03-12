import PropTypes from "prop-types";

export default function TmdAddBudgetsForm({
    onClose,
    onSubmit,
    tmdCategoryId,
    setTmdCategoryId,
    tmdAmountLimit,
    setTmdAmountLimit,
    tmdStartDate,
    setTmdStartDate,
    tmdEndDate,
    setTmdEndDate,
    tmdError,
}) {
    return (
        <div className="modal fade show d-block bg-secondary p-2 text-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" style={{ minWidth: "700px" }}>
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5 className="modal-title ms-4">
                            <strong>Tạo ngân sách</strong>
                        </h5>
                        <button type="button" className="btn-close bg-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {tmdError && (
                            <div className="d-flex justify-content-center mb-3 bg-danger p-2 rounded bg-opacity-50">
                                <span className="fs-5">
                                    <strong>{tmdError}</strong>
                                </span>
                            </div>
                        )}
                        <form onSubmit={onSubmit} className="m-4">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <select
                                        className="form-select bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdCategoryId}
                                        onChange={(e) => setTmdCategoryId(e.target.value)}
                                    >
                                        <option value="">Chọn danh mục</option>
                                        <option value="1">Thực phẩm</option>
                                        <option value="2">Giải trí</option>
                                        <option value="3">Học tập</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="number"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Số tiền đưa ra"
                                        value={tmdAmountLimit}
                                        onChange={(e) => setTmdAmountLimit(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="date"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdStartDate}
                                        onChange={(e) => setTmdStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="date"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdEndDate}
                                        onChange={(e) => setTmdEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-secondary w-100 rounded-pill">
                                        Submit
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
TmdAddBudgetsForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    tmdCategoryId: PropTypes.string.isRequired,
    setTmdCategoryId: PropTypes.func.isRequired,
    tmdAmountLimit: PropTypes.string.isRequired,
    setTmdAmountLimit: PropTypes.func.isRequired,
    tmdStartDate: PropTypes.string.isRequired,
    setTmdStartDate: PropTypes.func.isRequired,
    tmdEndDate: PropTypes.string.isRequired,
    setTmdEndDate: PropTypes.func.isRequired,
    tmdError: PropTypes.string,
};