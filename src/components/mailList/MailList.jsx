import React from "react";
import "./MailList.css";
function MailList() {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save Time, Save Money</h1>
      <span className="mailDescription">Sign Up</span>
      <div className="mailInput">
        <input type="text" placeholder="Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default MailList;
