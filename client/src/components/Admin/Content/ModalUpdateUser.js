import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

// lodash là hàm check array có rỗng hay ko

function ModalUpdateUser(props) {
  // lấy props từ bên cha MangageUser truyền sang
  const { show, setShow, dataUpdate } = props;

  // setShow dựa vào props, nó sẽ gọi ngược lên thằng cha
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRole("USER");
    setUsername("");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  };
  // handleShow sẽ cập nhật setShow, cập nhật show là true, là logic của JS

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");

  // sau khi định nghĩa state thì viết useEffect, khi thằng con nhận data thay đổi thì phải tự update bản thân
  useEffect(() => {
    // console.log("run useEffect");

    if (!_.isEmpty(dataUpdate)) {
      // nếu biến ko rỗng thì sẽ update state giá trị ng dùng
      setEmail(dataUpdate.email);
      setRole(dataUpdate.role);
      setUsername(dataUpdate.username);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jped;base64, ${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  // mỗi khi props dateUpdate thay đổi thì useState phải chạy lại tất cả, cập nhật lại

  const [previewImage, setPreviewImage] = useState("");
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.targe.files[0]);
    } else {
    }
    // cap nhat lai bien PreviewImage
  };

  // validate

  //call API
  // bên trái là các object đã khai báo trong Postman, phải ghi đúng
  // bên phải là các thuộc tính đã khai báo ở trên, cho React quản lí
  // let data = {
  //   email: email,
  //   password: password,
  //   username: username,
  //   role: role,
  //   userImage: image,
  // };
  // console.log(data);

  // thao tác vs database tốn thgian nên cần async await

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    const FormData = require("form-data");
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error(`Invalid Email`);
      return;
    }

    // từ formdata trên github axios cop về, truyền data tới postman
    // bắt buộc phải dùng formdata mới gửi đc lên server, form nay đã hỗ trợ sẵn ở browser

    // code gọn hơn, để các phần liên quan đến API sang chỗ khác
    // gọi gián tiếp, rồi gọi phản hồi về, rồi xử lí giao diện
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    console.log("compoent res", data);
    // EC , EM là obj đã tạo trong postman, xem ở Console
    // axiosCustomize đã lọc ra chỉ lấy data nếu có, trả về từ server
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // từ thằng con khi có data mới sẽ gọi ngược thằng cha Manage
      await props.fetchListUsersWithPaginate(props.currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled={true}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;
