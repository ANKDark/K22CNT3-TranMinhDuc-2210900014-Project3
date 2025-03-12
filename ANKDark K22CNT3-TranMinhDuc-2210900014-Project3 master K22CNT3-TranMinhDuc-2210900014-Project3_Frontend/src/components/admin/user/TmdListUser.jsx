import PropTypes from "prop-types"

export default function TmdListUser({ tmdListUser, tmdHandleEdit, tmdHandleDelete }) {
    return (
    <table className="table table-dark table-hover text-center rounded-3 overflow-hidden">
      <thead>
        <tr>
          <th>#</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Mật khẩu đã mã hóa</th>
          <th>Ngày đăng ký</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {tmdListUser.length > 0 ? (
            tmdListUser.map((tmdUser, index) => (
            <tr key={tmdUser.id}>
              <td className="text-light">{index + 1}</td>
              <td className="text-light">{tmdUser.tmdName}</td>
              <td className="text-light">{tmdUser.tmdEmail}</td>
              <td className="text-light">{tmdUser.tmdPasswordHash}</td>
              <td className="text-light">{tmdUser.tmdCreatedAt}</td>
              <td>
                <button className="btn btn-outline-info me-2" onClick={() => tmdHandleEdit(tmdUser)}>
                  Sửa
                </button>
                <button className="btn btn-outline-danger" onClick={(e) => tmdHandleDelete(tmdUser.id, e)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              Không có người dùng nào!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

TmdListUser.propTypes = {
    tmdListUser: PropTypes.array.isRequired,
    tmdHandleEdit: PropTypes.func.isRequired,
    tmdHandleDelete: PropTypes.func.isRequired,
  };