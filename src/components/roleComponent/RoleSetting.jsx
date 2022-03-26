import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

import { deleteRole, fetchRoles } from "../../redux/action/RoleAction";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";

export default function RoleSetting() {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editDesc, setEditDesc] = useState(null);

  const dispatch = useDispatch();

  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const rolesList = useSelector((state) => state.roles.rolesList);
  const createRoleSuccess = useSelector((state) => state.createRole.success);
  const deleteRoleSuccess = useSelector((state) => state.deleteRole.success);
  const updateRoleSuccess = useSelector((state) => state.updateRole.success);


  useEffect(() => {
    dispatch(fetchRoles(parsedToken));
  }, [createRoleSuccess, deleteRoleSuccess,updateRoleSuccess]);

  //custom functions

  const roleDelete = (id) => {
    dispatch(deleteRole(id, parsedToken));
  };

  const sendEditData = (id, name, desc) => {
    setIsEditing(true);
    setEditId(id);
    setEditName(name);
    setEditDesc(desc);
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "id",
      },
      {
        Header: "Role Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <button
              data-toggle="modal"
              data-target="#editRoleModal"
              style={{
                color: "blue",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
              }}
              onClick={() => {
                sendEditData(
                  row.original.id,
                  row.original.name,
                  row.original.description
                );
              }}
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
              onClick={() => {
                roleDelete(row.original.id);
              }}
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
              onClick={() => alert("hello")}
            >
              <i className="bi bi-gear"></i>
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: rolesList });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      <h1 className="title">Roles Setup</h1>

      <AddRoleModal />

      {isEditing ? (
        <EditRoleModal
          editId={editId}
          editDesc={editDesc}
          editName={editName}
          setIsEditing={setIsEditing}
        />
      ) : null}

      <div className="btn-container">
        <button
          className="btn-add"
          type="button"
          data-toggle="modal"
          data-target="#roleModal"
        >
          + Add Roles
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
