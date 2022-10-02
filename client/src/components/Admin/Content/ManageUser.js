import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import {
  getAllUsers,
  getUserWithPaginate,
} from "../../../services/apiServices";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import TableUserPaginate from "./TableUserPaginate";

export default function ManageUser(props) {
  const LIMIT_USER = 3;
  // khi ko có ng dùng thì ko hiển thị phân trang
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // nút add new ko nằm bên trong CreateUser nên cần đặt state cho thằng cha Manage
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);

  // get tất cả
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  // get ng dùng theo phân trang
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      // DT trong postman có thông số đấy
      setPageCount(res.DT.totalPages);
    }
  };

  // tạo hàm rồi set cho nó xuất hiện, gán nó xuống table ở dưới
  // thông tin đang ở thằng cha, muốn truyền cho con phải cập nhật lại state để return chạy lại, đưa cho react quản lí
  //  1 biến ko thể chia sẻ giữa các component, chỉ có React làm đc,
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  // khi đóng Modal ở trên thì sẽ cập nhật lại setDataUpdate là rỗng, khi click update thì về đúng state hiện tại
  const resetUpdateData = () => {
    setDataUpdate({});
  };

  // sau khi truyền từ con sang đây thì bây h định nghĩa nó

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">ManageUser </div>

      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            // tạo ở thằng con TableUser thì phải gọi lại ở đây
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            // tạo ở thằng con TableUser thì phải gọi lại ở đây
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* truyền xuống cho thằng con để dùng props ở ModalCreateUser */}
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          // đóng dấu X
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          // truyền sang cho thằng con ModalUpdateUser
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          // phai set lai currentPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {/* truyền biến xuống Modal */}
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          // tạo biến ở trên, để nó thực hiện đc thì truyền ở đây
          dataDelete={dataDelete}
          // sau khi delete xong phai goi lai list user, cap nhat lai data
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          // phai set lai currentPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
// kĩ năng check API từ phía backend quan trọng
// luồng data chạy ntn_?
