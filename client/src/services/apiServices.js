// nhung gi lien quan den API thi vao day
// biến instance liên quan đến axios
import axios from "../utils/axiosCustomize";

// vì là form data nên trong github của axios sẽ cần truyền vào những trường này
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
// phải là get để lấy dữ liệu về, ko truyền lên data như post nên ko cho vào
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

// ng dùng ko cần cập nhật email , pass nên ko cho vào
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();

  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  // phía backend quy định sẽ dùng put
  return axios.put("api/v1/participant", data);
};

const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
  // data để gửi lên server
  return axios.post(`api/v1/login`, {
    email: userEmail,
    password: userPassword,
    delay: 3000,
  });
  // phải nhìn bên postman xem ở body đang là form-data hay x-www-form để truyền data cho đúng
};

const postRegister = (userEmail, userPassword, username) => {
  // data để gửi lên server
  return axios.post(`api/v1/register`, {
    email: userEmail,
    password: userPassword,
    username: username,
  });
  // phải nhìn bên postman xem ở body đang là form-data hay x-www-form để truyền data cho đúng
};

// export ra nhiều file thì để dạng object { }, tạo ra nhiều biến
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUsers,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
