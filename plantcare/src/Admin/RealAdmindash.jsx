import React from "react";

import Adminmenu from "./Adminmenu";
import AdminRoutes from "./AdminRoutes";
const RealAdmindash = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <Adminmenu />
          </div>
          <div className="col-md=9">
            <AdminRoutes />
          </div>
        </div>
      </div>

      {/* <Userhome/> */}
    </div>
  );
};

export default RealAdmindash;
