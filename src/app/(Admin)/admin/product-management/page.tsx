"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import AddNewProducts from "@/components/admin/products/add-new-products";
import ProductTabs from "@/components/admin/products/product-tabs";
import ViewProduct from "@/components/admin/products/view-product";
import DisplayStats from "@/components/display-stats/display-stats";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function PageManagement() {
  const productsData = [
    {
      checkbox: true,
      no: "01",
      productId: "PRD001",
      productName: "Cotton T-Shirt",
      category: "Apparel",
      price: "$25.99",
      stock: 150,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "02",
      productId: "PRD002",
      productName: "Denim Jeans",
      category: "Apparel",
      price: "$59.99",
      stock: 75,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "03",
      productId: "PRD003",
      productName: "Leather Shoes",
      category: "Footwear",
      price: "$89.99",
      stock: 30,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "04",
      productId: "PRD004",
      productName: "Silk Scarf",
      category: "Accessories",
      price: "$19.99",
      stock: 200,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "05",
      productId: "PRD005",
      productName: "Running Sneakers",
      category: "Footwear",
      price: "$74.99",
      stock: 20,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "06",
      productId: "PRD006",
      productName: "Leather Wallet",
      category: "Accessories",
      price: "$39.99",
      stock: 0,
      status: "Out of Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "07",
      productId: "PRD007",
      productName: "Graphic Hoodie",
      category: "Apparel",
      price: "$49.99",
      stock: 95,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "08",
      productId: "PRD008",
      productName: "Baseball Cap",
      category: "Accessories",
      price: "$15.00",
      stock: 300,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "09",
      productId: "PRD009",
      productName: "Formal Shirt",
      category: "Apparel",
      price: "$45.00",
      stock: 110,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "10",
      productId: "PRD010",
      productName: "Canvas Backpack",
      category: "Bags",
      price: "$60.00",
      stock: 48,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "11",
      productId: "PRD011",
      productName: "Wool Beanie",
      category: "Accessories",
      price: "$12.00",
      stock: 85,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "12",
      productId: "PRD012",
      productName: "Slim Fit Pants",
      category: "Apparel",
      price: "$39.50",
      stock: 60,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "13",
      productId: "PRD013",
      productName: "Sport Watch",
      category: "Accessories",
      price: "$99.99",
      stock: 25,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "14",
      productId: "PRD014",
      productName: "Ankle Boots",
      category: "Footwear",
      price: "$120.00",
      stock: 15,
      status: "Low Stock",
    },
    {
      checkbox: true,
      no: "15",
      productId: "PRD015",
      productName: "Casual Dress",
      category: "Apparel",
      price: "$55.00",
      stock: 40,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "16",
      productId: "PRD016",
      productName: "Messenger Bag",
      category: "Bags",
      price: "$70.00",
      stock: 10,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "17",
      productId: "PRD017",
      productName: "Fleece Jacket",
      category: "Apparel",
      price: "$80.00",
      stock: 100,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "18",
      productId: "PRD018",
      productName: "Suede Loafers",
      category: "Footwear",
      price: "$99.00",
      stock: 5,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "19",
      productId: "PRD019",
      productName: "Bucket Hat",
      category: "Accessories",
      price: "$18.00",
      stock: 70,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "20",
      productId: "PRD020",
      productName: "Puffer Vest",
      category: "Apparel",
      price: "$65.00",
      stock: 0,
      status: "Out of Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "15",
      productId: "PRD015",
      productName: "Casual Dress",
      category: "Apparel",
      price: "$55.00",
      stock: 40,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "16",
      productId: "PRD016",
      productName: "Messenger Bag",
      category: "Bags",
      price: "$70.00",
      stock: 10,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "17",
      productId: "PRD017",
      productName: "Fleece Jacket",
      category: "Apparel",
      price: "$80.00",
      stock: 100,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "18",
      productId: "PRD018",
      productName: "Suede Loafers",
      category: "Footwear",
      price: "$99.00",
      stock: 5,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "19",
      productId: "PRD019",
      productName: "Bucket Hat",
      category: "Accessories",
      price: "$18.00",
      stock: 70,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "20",
      productId: "PRD020",
      productName: "Puffer Vest",
      category: "Apparel",
      price: "$65.00",
      stock: 0,
      status: "Out of Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "15",
      productId: "PRD015",
      productName: "Casual Dress",
      category: "Apparel",
      price: "$55.00",
      stock: 40,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "16",
      productId: "PRD016",
      productName: "Messenger Bag",
      category: "Bags",
      price: "$70.00",
      stock: 10,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "17",
      productId: "PRD017",
      productName: "Fleece Jacket",
      category: "Apparel",
      price: "$80.00",
      stock: 100,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "18",
      productId: "PRD018",
      productName: "Suede Loafers",
      category: "Footwear",
      price: "$99.00",
      stock: 5,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "19",
      productId: "PRD019",
      productName: "Bucket Hat",
      category: "Accessories",
      price: "$18.00",
      stock: 70,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "20",
      productId: "PRD020",
      productName: "Puffer Vest",
      category: "Apparel",
      price: "$65.00",
      stock: 0,
      status: "Out of Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "15",
      productId: "PRD015",
      productName: "Casual Dress",
      category: "Apparel",
      price: "$55.00",
      stock: 40,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "16",
      productId: "PRD016",
      productName: "Messenger Bag",
      category: "Bags",
      price: "$70.00",
      stock: 10,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "17",
      productId: "PRD017",
      productName: "Fleece Jacket",
      category: "Apparel",
      price: "$80.00",
      stock: 100,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "18",
      productId: "PRD018",
      productName: "Suede Loafers",
      category: "Footwear",
      price: "$99.00",
      stock: 5,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "19",
      productId: "PRD019",
      productName: "Bucket Hat",
      category: "Accessories",
      price: "$18.00",
      stock: 70,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "20",
      productId: "PRD020",
      productName: "Puffer Vest",
      category: "Apparel",
      price: "$65.00",
      stock: 0,
      status: "Out of Stock",
      more: <IoEyeOutline />,
    },
  ];

  const [productTabs, setProductTabs] = useState(false);
  const [viewProduct, setViewProduct] = useState({
    status: false,
    productId: "",
  });
  const [addNewProduct, setAddNewProduct] = React.useState(false);
  const pathname = usePathname();
  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        {productTabs ? (
          <ProductTabs />
        ) : viewProduct.status ? (
          <ViewProduct />
        ) : (
          <>
            <DisplayStats />

            <DynamicTable
              columns={[
                { key: "checkbox", label: "", type: "checkbox" as const },
                { key: "no", label: "NO" },
                { key: "productId", label: "Product ID" },
                { key: "productName", label: "Product Name" },
                { key: "category", label: "Category" },
                { key: "price", label: "Price" },
                { key: "stock", label: "Stock" },
                { key: "status", label: "Status" },
                { key: "more", label: "More", type: "action" },
              ]}
              data={productsData}
              onAction={(id: string) => {
                setViewProduct({
                  status: true,
                  productId: id,
                });
              }}
              title="Add New Products"
              itemsPerPage={5}
              searchPlaceholder="Search by name, ID..."
              showViewAll={true}
              onViewAll={() => setAddNewProduct(true)}
              navigations={[
                {
                  name: "All Products",
                  href: "/admin/product-management",
                },
                {
                  name: "Men",
                  href: "/admin/products",
                },
                {
                  name: "Women",
                  href: "/admin/products",
                },
                {
                  name: "Kids",
                  href: "/admin/products",
                },
                {
                  name: "Accessories",
                  href: "/admin/products",
                },
              ]}
            />
            {addNewProduct && (
              <AddNewProducts
                setAddNewProduct={setAddNewProduct}
                setProductTabs={setProductTabs}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default PageManagement;
