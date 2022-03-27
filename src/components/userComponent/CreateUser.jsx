import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { deleteUser, fetchUsers } from "../../redux/action/UserAction";
// import "../style.scss";
import EditUserModal from "./EditUserModal";
import UserConfig from "./UserConfig";
import UserModal from "./UserModal";

function CreateUser() {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [configUser, setConfigUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  const usersList = useSelector((state) => {
    return state.users.usersList;
  });
  const createUserSuccess = useSelector((state) => {
    return state.createUser.success;
  });
  const deleteUserSuccess = useSelector((state) => {
    return state.deleteUser.success;
  });
  const updateUserSuccess = useSelector((state) => {
    return state.updateUser.success;
  });

  const parsedToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    dispatch(fetchUsers(parsedToken));
  }, [createUserSuccess, deleteUserSuccess, updateUserSuccess]);

  //custom functions

  const userDelete = (id) => {
    dispatch(deleteUser(id, parsedToken));
  };

  const sendUserData = (id, name, email) => {
    setIsEditing(true);
    setEditId(id);
    setEditName(name);
    setEditEmail(email);
  };

  const handleConfigure = (id) => {
    setUserId(id);
    setConfigUser(true);
  };

  const columns = useMemo(
    () => [
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
            <button
              data-toggle="modal"
              data-target="#editUserModal"
              style={{
                color: "blue",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
              }}
              onClick={() =>
                sendUserData(
                  row.original.id,
                  row.original.name,
                  row.original.email
                )
              }
            >
              <i className="bi bi-pen"></i>
            </button>
            <button
              style={{
                color: "#e78787",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
              }}
              onClick={() => userDelete(row.original.id)}
            >
              <i className="bi bi-trash3"></i>
            </button>

            <button
              style={{
                color: "#green",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
              }}
              onClick={() => {
                handleConfigure(row.original.id);
              }}
            >
              <i className="bi bi-gear"></i>
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: usersList });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      {configUser ? (
        <UserConfig userId={userId}/>
      ) : (
        <>
          <h1 className="title">User Setup</h1>
          <UserModal />

          {isEditing ? (
            <EditUserModal
              isEditing={isEditing}
              editId={editId}
              editEmail={editEmail}
              editName={editName}
              setIsEditing={setIsEditing}
            />
          ) : null}

          <div className="btn-container">
            <button
              className="btn-add"
              type="button"
              data-toggle="modal"
              data-target="#userModal"
            >
              + Add User
            </button>
          </div>

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
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
      )}
    </>
  );
}

export default CreateUser;
