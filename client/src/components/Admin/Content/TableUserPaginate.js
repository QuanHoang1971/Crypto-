import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";

const TableUserPaginate = (props) => {
  // pageCount đc lấy dựa vào props, nhớ phải dùng { } vì bên thằng cha cũng dùng {}
  const { listUsers, pageCount } = props;
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // convert event.selected thành Number. phân trang sẽ tính từ 0 nên phải +1
    props.fetchListUsersWithPaginate(+event.selected + 1);
    // mỗi khi chuyển trang có state biết đc đang ở trang nào
    props.setCurrentPage(+event.selected + 1);
    // console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
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
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {/* <button className="btn btn-secondary mx-3">View</button> */}
                    <button
                      className="btn btn-warning mx-4"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mx-4"
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
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          // thuộc tính để khi xóa user sẽ quay về trang 1, seach GG
          // trang tính từ số 1, thì muốn quay lại phải -1
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
