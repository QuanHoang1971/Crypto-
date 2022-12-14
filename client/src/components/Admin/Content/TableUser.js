// {listUsers} ở cả bên ManagerUser là {} thì phải để nthe
// thằng con sẽ nhận props từ cha chuyển qua
const TableUser = (props) => {
  const { listUsers } = props;

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          {/* sau khi đống HTML này được chèn vào DOM thì mới gọi API
        để hàm return này nó chạy trước thì dùng useEffect, chạy sau khi hàm render này đc chạy
        hạn chế bị lỗi */}
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                /* tạo ra 1 key unique ở key={` `*/
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {/* <button className="btn btn-secondary mx-3">View</button> */}
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      // phải truyền vào item tham số đầu vào để biết đang delete tới ng dùng nào
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}> Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;

/* 1 col này =4 cols, table có 4 col nhưng chỉ có 1 dòng thông tin thôi  */
// DT là 1 mảng trả về từ server
