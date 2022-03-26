import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts, deleteProduct } from "../../redux/action/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

export default function Product() {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(null);
  const [editDesc, setEditDesc] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const productList = useSelector((state) => {
    return state.products.productList;
  });
  const createProductSuccess = useSelector((state) => {
    return state.createProduct.success;
  });
  const deleteProductSuccess = useSelector((state) => {
    return state.deleteProduct.success;
  });
  const updateProductSuccess = useSelector((state) => {
    return state.updateProduct.success;
  });

  useEffect(() => {
    dispatch(fetchProducts(parsedToken));
  }, [createProductSuccess, deleteProductSuccess, updateProductSuccess]);

  //custom functions

  const screenDelete = (id) => {
    dispatch(deleteProduct(id, parsedToken));
  };

  const sendEditData = (id, name, description, quantity) => {
    setIsEditing(true);
    setEditName(name);
    setEditDesc(description);
    setEditQuantity(quantity);
    setEditId(id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <button
              data-toggle="modal"
              data-target="#editProductModal"
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
                  row.original.description,
                  row.original.quantity
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
                screenDelete(row.original.id);
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: productList });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <h1 className="title">Product</h1>

      <AddProductModal />

      {isEditing ? (
        <EditProductModal
          editName={editName}
          editDesc={editDesc}
          editQuantity={editQuantity}
          editId={editId}
          setIsEditing={setIsEditing}
        />
      ) : null}

      <div className="btn-container">
        <button
          className="btn-add"
          type="button"
          data-toggle="modal"
          data-target="#productModal"
        >
          + Add Product
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
