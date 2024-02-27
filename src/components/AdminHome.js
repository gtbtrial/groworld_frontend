import { Link } from "react-router-dom";

var AdminHome = () => {
    return (
        <>
            <div className="top-brands">
                <div className="container">
                    <h2>Welcome Admin</h2>
                    <h3><Link to="/managecategory">Manage Category</Link></h3>
                    <h3><Link to="/managesubcategory">Manage Sub Category</Link></h3>
                    <h3><Link to="/manageproduct">Manage Product</Link></h3>
                    <h3><Link to="/createadmin">Create Admin</Link></h3>
                </div>
            </div>
        </>
    )
}
export default AdminHome;