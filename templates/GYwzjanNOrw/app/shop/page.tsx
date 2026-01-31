import { storeCatalog } from "@/lib/sfcc/constants";
import ProductList from "./components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACME Store | Shop",
  description: "ACME Store, your one-stop shop for all your needs.",
};

export default async function Shop() {
  return <ProductList collection={storeCatalog.rootCategoryId} />;
}
