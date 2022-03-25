import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScreen, getScreen } from "../../redux/action/ScreenAction";
import { useTable } from "react-table";
// import ScreenModal from "./ScreenModal";

export default function Screen() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(token);
  const screenList = useSelector((state) => {
    return state.screen.screenList;
  });

  //State for modal
  // const [openModal,setOpenModal] = useState(false);

  //custom functions

  const screenDelete = (id) => {
    dispatch(deleteScreen(id, parsedToken))
    dispatch(getScreen(parsedToken))
  }

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "id",
      },
      {
        Header: "Screen Name",
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
              style={{
                color: "blue",
                border: "none",
                fontSize: "1.2rem",
                margin: "0.5rem",
              }}
              onClick={() => alert("hello")}
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
              onClick= { () => {screenDelete(row.original.id)} }
                // dispatch(deleteScreen(row.original.id, parsedToken))
             
             
            >
              <i className="bi bi-trash3"></i>
            </button>
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getScreen(parsedToken));
  }, []);

  const tableInstance = useTable({ columns, data: screenList });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <h1>Screen Details</h1>

      {/* {openModal ?<ScreenModal setOpenModal = {setOpenModal}/> : null } */}
      

      <div className="btn-container">
        <button className="btn-add" type="button" onClick={() => { setOpenModal(true) }}>
          + Add Screen
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
