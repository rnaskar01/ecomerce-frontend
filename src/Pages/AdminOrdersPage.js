import NavBar from "../features/Navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";

function AdminOrdersPage() {
    return ( 
        <div>
        <NavBar>
            <AdminOrders />
        </NavBar>
    </div>
     );
}

export default AdminOrdersPage;