import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action.payload.DT.access_token,
          refresh_token: action.payload.DT.refresh_token,
          username: action.payload.DT.username,
          image: action.payload.DT.image,
          role: action.payload.DT.role,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;

// ...state để đảm bảo state trước đó đã có rồi, h ghi đè lên
// ko thay đổi state trực tiếp, mà nên đổi gián tiếp, ghi đè lên, ko thay đổi tùy tiên, gây ra bug
// toán tử optional sẽ dùng ?

// khi cập nhật account thành công sẽ cho Authenticated true
