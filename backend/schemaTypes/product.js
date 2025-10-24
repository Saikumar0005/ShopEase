export default {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    { 
      name: "title",
      title: "Product Title", 
      type: "string" 
    },
    { 
      name: "description", 
      title: "Description", 
      type: "text" 
    },
    { 
      name: "price", 
      title: "Original Price",
      type: "number"
    },
    {
      name: "discountPercent",
      title: "Discount %",
      type: "number"
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
};
