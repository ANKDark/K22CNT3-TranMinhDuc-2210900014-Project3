import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/TmdAuthContext";

export default function TmdProfileUser() {
    const { tmdUser, tmdEditProfile } = useAuth();
    const [tmdName, setTmdName] = useState("");
    const [tmdEmail, setTmdEmail] = useState("");
    const [tmdPasswordHash, setTmdPasswordHash] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (tmdUser) {
            setTmdName(tmdUser.tmdName || "");
            setTmdEmail(tmdUser.tmdEmail || "");
        }
    }, [tmdUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        if (tmdPasswordHash === "") {
            setTmdPasswordHash(tmdUser.tmdPasswordHash);
        }
        const result = await tmdEditProfile(tmdUser.id, tmdName, tmdEmail, tmdPasswordHash);

        if (result.success) {
            setMessage("Cập nhật thành công!");
        } else {
            setMessage(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="container mt-4 p-4 rounded-3 text-white" style={{ backgroundColor: "#343a40" }}>
            <div className="mb-3 bg-dark p-3 rounded-3">
                <h2 className="text-center text-white">Chỉnh sửa thông tin cá nhân</h2>
            </div>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="p-3 border rounded">
                <div className="container">
                    <div className="row">
                        <div className="col mb-3">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control bg-secondary p-2 text-white"
                                value={tmdName}
                                onChange={(e) => setTmdName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control bg-secondary p-2 text-white"
                                value={tmdEmail}
                                onChange={(e) => setTmdEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu mới (Để trống nếu không muốn đổi)</label>
                        <input
                            type="password"
                            className="form-control bg-secondary p-2 text-white"
                            value={tmdPasswordHash}
                            onChange={(e) => setTmdPasswordHash(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-secondary" disabled={loading}>
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
