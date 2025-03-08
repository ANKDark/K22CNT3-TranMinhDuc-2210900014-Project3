import { useState } from "react";
import PropTypes from "prop-types";

export default function TmdSearchCategoryForm({ tmdOnSearch }) {
  const [tmdSearch, setTmdSearch] = useState("");

  const tmdHandleChange = (e) => {
    setTmdSearch(e.target.value);
    tmdOnSearch(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control bg-dark text-white p-2"
        placeholder="Tìm kiếm danh mục..."
        value={tmdSearch}
        onChange={tmdHandleChange}
      />
    </div>
  );
}

TmdSearchCategoryForm.propTypes = {
  tmdOnSearch: PropTypes.func.isRequired,
};