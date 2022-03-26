import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

import { fetchRoles } from "../../redux/action/RoleAction";

export default function RoleSetting() {
  const dispatch = useDispatch();

  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const rolesList = useSelector((state) => state.roles.rolesList);
  console.log(rolesList);

  useEffect(() => {
    dispatch(fetchRoles(parsedToken));
  }, []);

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
              data-target="#editUserModal"
              style={{
                color: "blue",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
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

      <div className="btn-container">
        <button
          className="btn-add"
          type="button"
          // data-toggle="modal"
          // data-target="#userModal"
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
