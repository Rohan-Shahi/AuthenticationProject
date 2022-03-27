import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { mapUserRole } from "../../redux/action/screenRoleMap";
import "../style.scss";

export default function UserConfig({ userId }) {

    const [roleId,setRoleId] = useState(null);

  const dispatch = useDispatch();
  const userList = useSelector((state) => {
    return state.users.usersList;
  });

  const roleList = useSelector((state) => {
      return state.roles.rolesList;
  })
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const userOptions = userList.map((user) => {
    return { value: user.name, label: user.name };
  });

  const roleOptions = roleList.map((role) => {
    return { value: role.id, label: role.name };
  });


  //custom functions

  const handleRole = (e) => {
    setRoleId(e.value)
};

  const handleAssign = () => {
      dispatch(mapUserRole({userId: userId , roleId: roleId},parsedToken))
  };

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Configure Role to User</h1>
      <div className="select-screen">
        <Select options={userOptions}  />
      </div>
      <div className="select-crud">
        <Select options={roleOptions} onChange={handleRole}/>
      </div>

      <div className="role-btn mt-5">
        <button onClick={handleAssign} className="btn btn-success me-2 ">
          Map Role
        </button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </>
  );
}
