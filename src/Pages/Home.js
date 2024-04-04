import NavBar from "../features/Navbar/Navbar";
import ProductList from "../features/Product/components/ProductList";
import Footer from "../features/common/Footer";
function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList />
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default Home;