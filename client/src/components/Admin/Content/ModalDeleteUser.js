import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUsers } from "../../../services/apiServices";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
  // dùng dấu {show, setShow} vì để lấy từ cha truyền sang con
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  //   vì dataDelete đã có rồi nên ko cần truyền thông số () đầu vào
  const handleSubmitDeleteUser = async () => {
    // để lấy data
    let data = await deleteUsers(dataDelete.id);
    // EC , EM là obj đã tạo trong postman, xem ở Console
    // axiosCustomize đã lọc ra chỉ lấy data nếu có, trả về từ server
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // từ thằng con khi có data mới sẽ gọi ngược thằng cha Manage
      // await props.fetchListUsers();
      // cập nhật state của React thì ko cần await
      props.setCurrentPage(1);
      // xóa user xong sẽ quay về trang 1, gọi API thì cần await
      await props.fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user. Email=
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
{
  /* nếu có 2 thằng dataDelete và dataDelete.email thì lấy dataDelete.email, còn ko thì trả về "" rỗng */
}
