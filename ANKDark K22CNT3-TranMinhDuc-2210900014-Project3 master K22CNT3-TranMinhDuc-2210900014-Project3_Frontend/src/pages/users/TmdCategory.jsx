import { useState, useEffect } from "react";
import { useTmdCategory } from "../../contexts/TmdCategoryContext";
import TmdAddCategoryForm from "../../components/category/TmdAddCategoryForm";
import TmdListCategory from "../../components/category/TmdListCategory";
import TmdUpdateCategoryForm from "../../components/category/TmdUpdatecategoryForm";
import TmdSearchCategoryForm from "../../components/category/TmdSearchCategoryForm";
import '../../styles/tmdCategory.css';

export default function TmdCategory() {
  const { tmdMessage, tmdListCategory, tmdAddCategory, tmdUpdateCategory, tmdDeleteCategory, tmdGetCategoryByName } = useTmdCategory();

  const [tmdFilteredCategory, setTmdFilteredCategory] = useState(tmdListCategory);
  const [tmdName, setTmdName] = useState("");
  const [tmdType, setTmdType] = useState(true);
  const [tmdShowAddModal, setTmdShowAddModal] = useState(false);
  const [tmdShowUpdateModal, setTmdShowUpdateModal] = useState(false);
  const [tmdNameUpdate, setTmdNameUpdate] = useState("");
  const [tmdTypeUpdate, setTmdTypeUpdate] = useState(true);
  const [tmdCurrentId, setTmdCurrentId] = useState(null);
  const [tmdError, setTmdError] = useState(null);

  useEffect(() => {
    setTmdFilteredCategory(tmdListCategory);
  }, [tmdListCategory]);

  const tmdOnSearch = (tmdSearch) => {
    const result = tmdGetCategoryByName(tmdSearch);
    setTmdFilteredCategory(result);
  };

  const tmdHandleSubmit = async (e) => {
    e.preventDefault();
    if (!tmdName.trim()) {
      setTmdError("Vui lòng nhập tên danh mục!");
      return;
    }
    await tmdAddCategory(tmdName, tmdType);
    setTmdName("");
    setTmdType(true);
    setTmdShowAddModal(false);
  };

  const tmdHandleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!tmdNameUpdate.trim()) {
      setTmdError("Vui lòng nhập tên danh mục!");
      return;
    }
    await tmdUpdateCategory(tmdCurrentId, tmdNameUpdate, tmdTypeUpdate);
    setTmdShowUpdateModal(false);
  };

  const tmdHandleEdit = (tmdCate) => {
    setTmdShowUpdateModal(true);
    setTmdCurrentId(tmdCate.id);
    setTmdNameUpdate(tmdCate.tmdName);
    setTmdTypeUpdate(tmdCate.tmdType);
  };

  const tmdHandleDelete = async (id, e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      await tmdDeleteCategory(id);
    }
  };

  return (
    <div className="container mt-4 p-4 rounded-3" style={{ backgroundColor: "#343a40" }}>
      {tmdMessage && (
        <div className="alert alert-secondary text-center fixed-top w-50 mx-auto mt-2">
          {tmdMessage}
        </div>
      )}
      <div className="mb-3 bg-dark p-3 rounded-3">
        <h2 className="text-center text-white">Danh sách danh mục</h2>
      </div>
      <button className="btn btn-primary mb-3" onClick={() => setTmdShowAddModal(true)}>
        Thêm mới danh mục
      </button>

      <div className="w-50 mx-auto mb-3">
        <TmdSearchCategoryForm tmdOnSearch={tmdOnSearch} />
      </div>

      {tmdShowAddModal && (
        <TmdAddCategoryForm
          tmdName={tmdName}
          setTmdName={setTmdName}
          tmdType={tmdType}
          setTmdType={setTmdType}
          error={tmdError}
          tmdHandleSubmit={tmdHandleSubmit}
          onClose={() => setTmdShowAddModal(false)}
        />
      )}

      {tmdShowUpdateModal && (
        <TmdUpdateCategoryForm
          tmdName={tmdNameUpdate}
          setTmdNameUpdate={setTmdNameUpdate}
          tmdType={tmdTypeUpdate}
          setTmdTypeUpdate={setTmdTypeUpdate}
          tmdHandleSubmit={tmdHandleSubmitUpdate}
          error={tmdError}
          onClose={() => setTmdShowUpdateModal(false)}
        />
      )}

      <TmdListCategory
        tmdListCategory={tmdFilteredCategory}
        tmdHandleEdit={tmdHandleEdit}
        tmdHandleDelete={tmdHandleDelete}
      />
    </div>
  );
}
