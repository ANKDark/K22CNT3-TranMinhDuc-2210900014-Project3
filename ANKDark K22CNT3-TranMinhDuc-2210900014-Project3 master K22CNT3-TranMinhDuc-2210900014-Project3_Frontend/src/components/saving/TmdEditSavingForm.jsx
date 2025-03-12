import PropTypes from "prop-types";

export default function TmdEditSavingForm({
    tmdGoalName,
    setTmdGoalName,
    tmdHandleSubmit,
    error,
    onClose,
    tmdTargetAmount,
    setTmdTargetAmount,
    tmdSavedAmount,
    setTmdSavedAmount,
    tmdTargetDate,
    setTmdTargetDate,
}) {
    return (
        <div className="modal fade show d-block bg-secondary p-2 text-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" style={{ minWidth: "700px" }}>
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5 className="modal-title ms-4">
                            <strong>Chỉnh sửa khoản tiết kiệm</strong>
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
                                    <label className="form-label">Tên mục tiêu</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Nhập tên mục tiêu"
                                        value={tmdGoalName}
                                        onChange={(e) => setTmdGoalName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Số tiền muốn tiết kiệm</label>
                                    <input
                                        type="number"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Nhập số tiền mục tiêu"
                                        value={tmdTargetAmount}
                                        onChange={(e) => setTmdTargetAmount(e.target.value)}
                                        required
                                        min="1"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Số tiền đã tiết kiệm</label>
                                    <input
                                        type="number"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Nhập số tiền đã tiết kiệm"
                                        value={tmdSavedAmount}
                                        onChange={(e) => setTmdSavedAmount(e.target.value)}
                                        required
                                        min="0"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ngày đến hạn</label>
                                    <input
                                        type="date"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdTargetDate}
                                        onChange={(e) => setTmdTargetDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-secondary w-100 rounded-pill">
                                        Cập nhật khoản tiết kiệm
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

TmdEditSavingForm.propTypes = {
    tmdGoalName: PropTypes.string.isRequired,
    setTmdGoalName: PropTypes.func.isRequired,
    tmdHandleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    tmdTargetAmount: PropTypes.string.isRequired,
    setTmdTargetAmount: PropTypes.func.isRequired,
    tmdSavedAmount: PropTypes.string.isRequired,
    setTmdSavedAmount: PropTypes.func.isRequired,
    tmdTargetDate: PropTypes.string.isRequired,
    setTmdTargetDate: PropTypes.func.isRequired,
};
