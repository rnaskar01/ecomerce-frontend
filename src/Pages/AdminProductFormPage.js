import NavBar from "../features/Navbar/Navbar";
import ProductForm from "../features/admin/components/ProductForm";

function AdminProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <ProductForm />
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;