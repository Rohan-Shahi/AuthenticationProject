import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getScreen } from "../../redux/action/ScreenAction";
import { mapScreenRole } from "../../redux/action/screenRoleMap";
import "../style.scss";

const crudOptions = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

export default function ConfigureRole({ roleId }) {

  // const screenMapSuccess = useSelector((state) => {return state.screenMap.success})

  //States for keeping screen choice and crud choice

  const [screen, setScreen] = useState(null);
  const [crud, setCrud] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
  });

  //For accessing screen list
  const dispatch = useDispatch();
  const screenList = useSelector((state) => {
    return state.screen.screenList;
  });
  const parsedToken = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    dispatch(getScreen(parsedToken));
  }, []);

  const screenOptions = screenList.map((screen) => {
    return { value: screen.name, label: screen.name };
  });

  //custom functions

  const handleScreen = (e) => {
    setScreen(e.value);
  };

  const handleAssign = () => {
    const data = [{ [screen]: crud }];
    dispatch(
      mapScreenRole(
        {
          id: roleId,
          mapping: data[0],
        },
        parsedToken
      )
    );

  };

  const handleCrud = (e) => {
    e.forEach((opt) => {
      switch (opt.value) {
        case "create":
          setCrud({ ...crud, create: true });
          break;
        case "read":
          setCrud({ ...crud, read: true });
          break;

        case "update":
          setCrud({ ...crud, update: true });
          break;

        case "delete":
          setCrud({ ...crud, delete: true });
          break;

        default:
          break;
      }
    });
  };

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Assign role to user</h1>
      <div className="select-screen">
        <Select options={screenOptions} onChange={handleScreen} />
      </div>
      <div className="select-crud">
        <Select options={crudOptions} isMulti={true} onChange={handleCrud} />
      </div>

      <div className="role-btn mt-5">
        <button onClick={handleAssign} className="btn btn-success me-2 ">
          Assign
        </button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </>
  );
}
