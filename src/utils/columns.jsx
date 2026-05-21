export const categorycols = [
  {
    key: "id",
    title: "#",
    width: "50px",
  },
  // {
  //   key: "image_url",
  //   title: "الصورة",
  //   width: "150px",
  //   isImage: true,
  //   render: (value) => <img src={value} className={` w-full  h-[60px]`} />,
  // },
  {
    key: "name",
    title: "الاسم",
    width: "150px",
  },
  {
    key: "count",
    title: "عدد الاصناف الفرعية",
    width: "150px",
  },
  {
    key: "actions",
    title: "الاجرائات",
    width: "120px",
    isActions: true,
  },
];

export const subcategorycols = [
  {
    key: "name",
    title: "الاسم",
    width: "200px",
  },
  // {
  //   key: "number",
  //   title: "عدد المنتجات",
  //   width: "150px",
  // },
  {
    key: "is_active",
    title: "نشط ؟",
    width: "150px",
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium
        ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {value ? "نشط" : "غير نشط"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "الاجرائات",
    width: "120px",
    isActions: true,
  },
];

export const productcols = [
  {
    key: "id",
    title: "#",
    width: "40px",
  },
  // {
  //   key: "featured_image_url",
  //   title: "الصورة",
  //   width: "80px",
  //   isImage: true,
  //   render: (value) => <img src={value} className={` w-1/2 h-full`} />,
  // },
  {
    key: "name",
    title: "اسم المنتج",
    width: "250px",
  },
  // {
  //   key: "slug",
  //   title: "Slug",
  //   width: "100px",
  // },

  {
    key: "is_featured",
    title: "مميز",
    width: "120px",
    isBoolean: true,
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium
        ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {value ? "مميز" : "غير مميز"}
      </span>
    ),
  },
  {
    key: "is_active",
    title: " نشط ؟ ",
    width: "80px",
    isBoolean: true,
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium
        ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {value ? "نشط" : "غير نشط"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "الإجراءات",
    width: "120px",
    isActions: true,
  },
];

export const usercols = (navigate) => [
  {
    key: "name",
    title: "الاسم",
    width: "150px",
  },
  {
    key: "phone",
    title: "الهاتف",
    width: "150px",
  },
  {
    key: "id",
    title: "الطلبات",
    width: "150px",
    render: (value) => (
      <button
        onClick={() => navigate(`/orders?client_id=${value}`)}
        className=" underline underline-offset-4 cursor-pointer"
      >
        عرض الطلبات
      </button>
    ),
  },
  // {
  //   key: "actions",
  //   title: "الاجرائات",
  //   width: "50px",
  //   isActions: true,
  // },
];

export const ordercols = [
  {
    key: "id",
    title: "#",
    width: "30px",
  },
  {
    key: "order_number",
    title: "رقم الطلب",
    width: "30px",
  },
  {
    key: "name",
    title: " اسم الزبون",
    width: "120px",
  },
  {
    key: "phone",
    title: "رقم الهاتف",
    width: "120px",
  },
  {
    key: "status",
    title: "حالة الطلب",
    width: "100px",
  },
  {
    key: "grand_total",
    title: "السعر الاجمالي",
    width: "100px",
  },
  // {
  //   key: "item_count",
  //   title: "عدد العناصر",
  //   width: "100px",
  // },
  {
    key: "actions",
    title: "الاجرائات",
    width: "50px",
    isActions: true,
  },
];

export const orderitemcols = [
  {
    key: "image",
    title: "الصورة",
    width: "12px",
    isImage: true,
    render: (value) => <img src={value} className={` w-[100px] h-[60px]`} />,
  },
  // variation too
  {
    key: "name",
    title: "اسم المنتح",
    width: "200px",
  },
  {
    key: "selected_attributes",
    title: "الصفات المختارة",
    width: "200px",
    render: (value) => {
      if (!value || value.length === 0) return "-";

      return (
        <div className="flex flex-wrap gap-2">
          {value.map((attr, index) => (
            <span
              key={index}
              className="
              rounded-lg
              tag
              p-1
              text-xs
              font-normal
              text-gray-600
            "
            >
              {attr.name} : {attr.value}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    key: "unit_price",
    title: "السعر",
    width: "60px",
  },

  {
    key: "quantity",
    title: "الكمية",
    width: "60px",
  },

  {
    key: "subtotal",
    title: "الاجمالي",
    width: "60px",
  },
];

export const attributecols = [
  {
    key: "name",
    title: "الاسم",
    width: "200px",
  },

  {
    key: "type",
    title: "النمط",
    width: "200px",
    render: (value) => (
      <span
      // className={`px-2 py-1 rounded-full text-xs font-medium
      // ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {value == "text" ? "نص" : "اختيار"}
      </span>
    ),
  },

  {
    key: "count",
    title: "عدد القيم لهذه الصفة",
    width: "200px",
  },

  {
    key: "actions",
    title: "الاجرائات",
    width: "120px",
    isActions: true,
  },
];

export const optioncols = [
  // {
  //   key: "name",
  //   title: "الاسم",
  //   width: "200px",
  // },
  {
    key: "value",
    title: "القيمة",
    width: "200px",
  },
  {
    key: "actions",
    title: "الاجرائات",
    width: "120px",
    isActions: true,
  },
];

export const variationcols = [
  {
    key: "id",
    title: "#",
    width: "50px",
  },
  {
    key: "image_url",
    title: "الصورة",
    width: "80px",
    isImage: true,
    render: (value) => <img src={value} className={` w-[100px] h-[60px]`} />,
  },
  {
    key: "sku",
    title: "رمز المنتج",
    width: "50px",
  },
  {
    key: "price",
    title: "السعر",
    width: "75px",
  },
  {
    key: "quantity",
    title: "الكمية",
    width: "75px",
  },

  {
    key: "actions",
    title: "الاجرائات",
    width: "120px",
    isActions: true,
  },
];

export const variationattributecols = [
  {
    key: "id",
    title: "#",
    width: "30px",
  },

  {
    key: "attribute_name",
    title: "الصفة",
    width: "120px",
  },

  {
    key: "attribute_option_name",
    title: "القيمة",
    width: "120px",
  },
  // {
  //   key: "attribute_option_name",
  //   title: "القيمة",
  //   width: "120px",
  // },
  // {
  //   key: "actions",
  //   title: "الاجرائات",
  //   isActions: true,
  //   width: "50px",
  // },
];

export const messagecols = [
  {
    key: "content",
    title: "الرسالة",
    width: "400px",
  },

  {
    key: "actions",
    title: "الاجرائات",
    width: "100px",
    isActions: true,
  },
];
