import { cloneDeep, get, isEmpty } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { setAccessManagement } from "../efficiencySlice";

const ProvideAccess = () => {
  const { efficiency } = useSelector((state) => state);

  const { userDetails, groupDetails } = efficiency.accessManagement;

  const dispatch = useDispatch();


  const [state, setState] = useState({
    addUserShow: false,
    addUserClassName: "",
  });
  const handleAdduserShow = (index) => {
    
    let className = groupDetails[index].className === "" ? "active" : "";
    let clonedArray = cloneDeep(groupDetails);
    let clonedObject = { ...groupDetails[index], className };
    clonedArray[index] = clonedObject;
    dispatch(
      setAccessManagement(get(efficiency,'accessManagement',{}),{
        groupDetails:clonedArray
      })
    )
  };
  return (
    <>
      {!isEmpty(groupDetails) &&
        groupDetails.map((tool, idx) => (
          <div class="toolboard-row" key={idx}>
            <div class="toolleft">
              <div class="groups_title">
                <h4>{tool.groups}</h4>
              </div>
              <div class="user_list"></div>
            </div>
            <div class="toolright">
              <a class="outline-button" onClick={() => handleAdduserShow(idx)}>
                <span>+</span> Add User
              </a>
              <div class={`adduser-row ${tool.className}`}>
                <div class="groupinput">
                  <input
                    type="text"
                    placeholder="Type user name"
                    class="typeahead_1 input_row"
                  />{" "}
                  <button type="submit" class="gray-btn">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProvideAccess;
