import React, { memo,useState } from 'react'
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import {
    featherFilter,
    fileExport,
    fileImport,
    iconElipsis,
    plusico,
  } from "../../../assets/images";
import FilterModal from './FilterModal';
import "../efficiency.scss"
const AppConfigHeader = () => {
    const [state, setstate] = useState({
        open:false
    });
    const onModal = () => {
      setstate((state)=>({
        ...state,
        open:!state.open
      }))
    }
  return (
    <div class="fltractnav">
      <Modal open={state.open} onClose={onModal} center classNames={{
        modal:'filter_modal'
      }}>
            <FilterModal/>
        </Modal>
        <div class="actleft">
          <div class="appfilternav">
        
            <a  data-bs-toggle="modal" data-bs-target="#filterpopup" onClick={onModal}>
              <span>
                <img src={featherFilter}/>
              </span>{" "}
              Filter
            </a>
          </div>
        </div>
        <div class="actright">
          <a onclick="newCMDB();" class="border-btn">
            <span>
              <img src={plusico} />
            </span>{" "}
            New Application Configuration
          </a>
          <div class="dropdown secdrop">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="re1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={iconElipsis} />
            </a>
            <ul class="dropdown-menu" aria-labelledby="re1">
              <li>
                <a
                  onclick="importCmdbModel();"
                  data-bs-toggle="modal"
                  data-bs-target="#importpopup"
                >
                  <span>
                    <img src={fileImport} />
                  </span>{" "}
                  Import Configuration Item
                </a>
              </li>
              <li>
                <a onclick="exportCmdb();">
                  <span>
                    <img src={fileExport} />
                  </span>{" "}
                  Export Configuration Item
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default memo(AppConfigHeader)