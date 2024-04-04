import NavBar from "../features/Navbar/Navbar";
import ProductDetails from "../features/Product/components/ProductDetails";
import Footer from "../features/common/Footer";
function ProductDetailsPage() {
    return ( 
        <div>
            <NavBar>
                <ProductDetails />
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default ProductDetailsPage;