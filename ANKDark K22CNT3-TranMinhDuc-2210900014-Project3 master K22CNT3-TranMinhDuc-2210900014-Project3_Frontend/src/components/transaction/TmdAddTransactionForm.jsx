import PropTypes from "prop-types";

export default function TmdAddTransactionForm({
    tmdAmount,
    setTmdAmount,
    tmdCategoryId,
    setTmdCategoryId,
    tmdCategories,
    tmdTransactionDate,
    setTmdTransactionDate,
    tmdNote,
    setTmdNote,
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
                            <strong>Tạo giao dịch</strong>
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
                                        type="number"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Số tiền"
                                        value={tmdAmount}
                                        onChange={(e) => setTmdAmount(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <select
                                        className="form-select bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdCategoryId}
                                        onChange={(e) => setTmdCategoryId(e.target.value)}>
                                        <option value="">Chọn danh mục</option>
                                        {tmdCategories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.tmdName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="date"
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        value={tmdTransactionDate}
                                        onChange={(e) => setTmdTransactionDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <textarea
                                        className="form-control bg-secondary text-white border-0 p-2 rounded"
                                        placeholder="Ghi chú"
                                        value={tmdNote}
                                        onChange={(e) => setTmdNote(e.target.value)}
                                    ></textarea>
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

TmdAddTransactionForm.propTypes = {
    tmdAmount: PropTypes.string.isRequired,
    setTmdAmount: PropTypes.func.isRequired,
    tmdCategoryId: PropTypes.string.isRequired,
    setTmdCategoryId: PropTypes.func.isRequired,
    tmdCategories: PropTypes.array.isRequired,
    tmdTransactionDate: PropTypes.string.isRequired,
    setTmdTransactionDate: PropTypes.func.isRequired,
    tmdNote: PropTypes.string,
    setTmdNote: PropTypes.func.isRequired,
    tmdHandleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};
