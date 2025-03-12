import { useState } from "react";
import { useTmdSaving } from "../../contexts/TmdSavingContext";
import TmdListSaving from "../../components/saving/TmdListSaving";
import TmdAddSavingForm from "../../components/saving/TmdAddSavingForm";
import TmdEditSavingForm from "../../components/saving/TmdEditSavingForm";

export default function TmdSaving() {
  const {
    tmdListSaving,
    tmdAddSaving,
    tmdEditSaving,
    tmdDeleteSaving,
    tmdMessage,
  } = useTmdSaving();

  const [tmdShowAddModal, setTmdShowAddModal] = useState(false);
  const [tmdShowEditModal, setTmdShowEditModal] = useState(false);
  const [tmdGoalName, setTmdGoalName] = useState("");
  const [tmdTargetAmount, setTmdTargetAmount] = useState("");
  const [tmdSavedAmount, setTmdSavedAmount] = useState("");
  const [tmdTargetDate, setTmdTargetDate] = useState("");
  const [tmdSavingId, setTmdSavingId] = useState("");
  const [tmdError, setTmdError] = useState(null);

  const tmdResetForm = () => {
    setTmdGoalName("");
    setTmdTargetAmount("");
    setTmdSavedAmount("");
    setTmdTargetDate("");
    setTmdError(null);
  };

  const tmdHandleSubmit = async (e) => {
    e.preventDefault();

    if (!tmdGoalName.trim()) {
      setTmdError("Vui lòng nhập tên mục tiết kiệm!");
      return;
    }
    if (!String(tmdTargetAmount).trim()) {
      setTmdError("Vui lòng nhập số tiền muốn tiết kiệm!");
      return;
    }
    if (!String(tmdSavedAmount).trim()) {
      setTmdError("Vui lòng nhập số tiền đã tiết kiệm!");
      return;
    }
    if (!tmdTargetDate.trim()) {
      setTmdError("Vui lòng chọn ngày đến hạn!");
      return;
    }

    await tmdAddSaving(tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate);
    setTmdShowAddModal(false);
    tmdResetForm();
  };

  const tmdHandleEdit = (tmdSaving) => {
    setTmdGoalName(tmdSaving.tmdGoalName);
    setTmdTargetAmount(tmdSaving.tmdTargetAmount);
    setTmdSavedAmount(tmdSaving.tmdSavedAmount);
    setTmdTargetDate(tmdSaving.tmdTargetDate);
    setTmdSavingId(tmdSaving.id);
    setTmdShowEditModal(true);
  };

  const tmdHandleUpdate = async (e) => {
    e.preventDefault();

    if (!tmdGoalName.trim()) {
      setTmdError("Vui lòng nhập tên mục tiết kiệm!");
      return;
    }
    if (!String(tmdTargetAmount).trim()) {
      setTmdError("Vui lòng nhập số tiền muốn tiết kiệm!");
      return;
    }
    if (!String(tmdSavedAmount).trim()) {
      setTmdError("Vui lòng nhập số tiền đã tiết kiệm!");
      return;
    }
    if (!tmdTargetDate.trim()) {
      setTmdError("Vui lòng chọn ngày đến hạn!");
      return;
    }

    await tmdEditSaving(tmdSavingId, tmdGoalName, tmdTargetAmount, tmdSavedAmount, tmdTargetDate);
    setTmdShowEditModal(false);
    tmdResetForm();
  };

  const tmdHandleDelete = async (id, e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xóa khoản tiết kiệm này?")) {
      await tmdDeleteSaving(id);
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
        <h2 className="text-center text-white">Danh sách tiết kiệm</h2>
      </div>
      <button className="btn btn-primary mb-3" onClick={() => setTmdShowAddModal(true)}>
        Thêm mới khoản tiết kiệm
      </button>

      <TmdListSaving
        tmdListSaving={tmdListSaving}
        tmdHandleEdit={tmdHandleEdit}
        tmdHandleDelete={tmdHandleDelete}
      />

      {tmdShowAddModal && (
        <TmdAddSavingForm
          tmdGoalName={tmdGoalName}
          setTmdGoalName={setTmdGoalName}
          tmdTargetAmount={tmdTargetAmount}
          setTmdTargetAmount={setTmdTargetAmount}
          tmdSavedAmount={tmdSavedAmount}
          setTmdSavedAmount={setTmdSavedAmount}
          tmdTargetDate={tmdTargetDate}
          setTmdTargetDate={setTmdTargetDate}
          tmdHandleSubmit={tmdHandleSubmit}
          onClose={() => {
            setTmdShowAddModal(false);
            tmdResetForm();
          }}
          error={tmdError}
        />
      )}

      {tmdShowEditModal && (
        <TmdEditSavingForm
          tmdGoalName={tmdGoalName}
          setTmdGoalName={setTmdGoalName}
          tmdTargetAmount={tmdTargetAmount}
          setTmdTargetAmount={setTmdTargetAmount}
          tmdSavedAmount={tmdSavedAmount}
          setTmdSavedAmount={setTmdSavedAmount}
          tmdTargetDate={tmdTargetDate}
          setTmdTargetDate={setTmdTargetDate}
          tmdHandleSubmit={tmdHandleUpdate}
          onClose={() => {
            setTmdShowEditModal(false);
            tmdResetForm();
          }}
          error={tmdError}
        />
      )}
    </div>
  );
}
