import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaUsers,
  FaCalendarAlt,
  FaHotTub,
  FaInbox,
  FaBars,
  FaCar,
  FaShippingFast,
  FaRegEdit,
  FaCodepen,
  FaAllergies,
  FaTags,
} from "react-icons/fa";
import useCheckRole from "./useCheckRole";

const Dashboard = () => {
  const [isAdmin, isDriver] = useCheckRole();


  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">
          <FaBars />
        </label>
        <div className="drawer-content">
          <Outlet></Outlet>          
        </div>
        <div className="drawer-side bg-secondary">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80">
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/admin/home">
                    <FaHome></FaHome> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/all-users">
                    <FaUsers></FaUsers> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/all-cars">
                    <FaCar></FaCar> All Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/coupon">
                    <FaTags></FaTags> Coupon
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/admin/manage-tours">
                    <FaHotTub></FaHotTub> Manage tours
                  </NavLink>
                </li>
                <div className="divider"></div>
              </>
            )}

            {isDriver && (
              <>
                <li>
                  <NavLink to="/dashboard/driver/home">
                    <FaHome></FaHome> Driver Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/driver/add-cars">
                    <FaShippingFast></FaShippingFast> Add Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/driver/update-cars">
                    <FaRegEdit></FaRegEdit> Update Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/driver/pending-tours">
                    <FaAllergies></FaAllergies> Pending Tours
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/driver/all-tours">
                    <FaCodepen></FaCodepen> All Tours
                  </NavLink>
                </li>
                <div className="divider"></div>
              </>
            )}
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-rides">
                <FaCalendarAlt></FaCalendarAlt> My Rides
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/pending-rides">
                <FaInbox></FaInbox> Pending rides
              </NavLink>
              <NavLink to="/dashboard/payment-history">
                <FaWallet></FaWallet> Payment History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
