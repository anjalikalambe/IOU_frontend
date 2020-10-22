import React, { useState } from "react";
import "./TopNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./UI/Dropdown";
import { useStore } from "../stores/helpers/UseStore";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import GiftModal from "./GiftModal";

function TopNav() {
  const { auth } = useStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('Favour');

  const history = useHistory();

  const collapse = () => {
    if (showDropdown) {
      setTimeout(() => {
        setShowDropdown(false);
      }, 0);
    }
  };
  const logout = () => {
    auth.logout(() => history.push("/login"));
  };

  const expand = () => {
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  const createFavour = (payload) => {
    setShowModal(true);
    setStatus(payload);
  };

  return (
    <div id="topnav">
      <Button variant="outlined" size="large" onClick={() => createFavour('Favour')}>
        Create Favour
      </Button>
      <Button variant="outlined" size="large" onClick={() => createFavour('Reward')}>
        Create Reward
      </Button>
      <div className="profile">
        <div
          onClick={() => !showDropdown && expand()}
          className="profile__information flex align-center"
        >
          <img src="/displaypic.png" alt="" />
          <span style={{ textTransform: "capitalize" }}>
            {auth.username} <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </div>
        {showDropdown ? <Dropdown logout={logout} collapse={collapse} /> : ""}
      </div>
      <GiftModal
        onClose={() => {
          setShowModal(false);
        }}
        isOpen={showModal}
        status={status}
      />
    </div>
  );
}
export default observer(TopNav);
