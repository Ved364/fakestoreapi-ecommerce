import ProductsPage from "@/pages/ProductsPage";
import { getProducts } from "@/utils/products";

const Products = async () => {
  const products = await getProducts();
  return (
    <>
      <ProductsPage products={products} />
    </>
  );
};

export default Products;
