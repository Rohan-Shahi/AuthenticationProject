import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { fetchUsers } from "../../redux/action/UserAction";
import "../style.scss";
// import UserModal from "./UserModal";

function CreateUser() {

  const dispatch = useDispatch();
  const usersList = useSelector((state) => {
      return state.users.usersList;
  })

  const parsedToken = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    dispatch(fetchUsers(parsedToken))
  },[])

  const columns = useMemo(() => [
    {
      Header: "S.N",
      accessor: "id",
    },
    {
      Header: "User",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <button style={{ color: "blue", border :'none',fontSize:'1.2rem',margin:'0.5rem' }} onClick={() => alert("hello")}>
            <i className="bi bi-pen"></i>
          </button>
          <button
            style={{ color: "#e78787", border :'none',fontSize:'1.2rem',margin:'0.5rem' }}
            onClick={() => alert(row.original.id)}
          >
            <i className="bi bi-trash3"></i>
          </button>
          <button style={{ color: "#green", border :'none',fontSize:'1.2rem',margin:'0.5rem' }} onClick={() => alert("hello")}>
            <i className="bi bi-gear"></i>
          </button>
        </>
      ),
    },
  ],[]);

  const tableInstance = useTable({ columns, data: usersList });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      {/* <UserModal/> */}
      <h1 className="title">User Setup</h1>

      <div className="btn-container">
        <button
          className="btn-add"
          type="button"
          // data-toggle="modal"
          // data-target="#exampleModal"
        >
          + Add User
        </button>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CreateUser;
