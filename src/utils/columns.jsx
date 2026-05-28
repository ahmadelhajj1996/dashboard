import dayjs from "dayjs";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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


export const notificationcols = (
  showExchangeColumns = false
) => {
  const baseColumns = [
    {
      key: "message",
      title: "نص الإشعار",
      width: "800px",
    },

    {
      key: "result",
      title: "النوع",
      width: "200px",
      render: (value) => {
        if (value === "normal") {
          return <p className="text-blue-700">عادي</p>;
        }

        if (value === "warning") {
          return <p className="text-yellow-400">تحذير</p>;
        }

        return <p className="text-red-600">حرج</p>;
      },
    },
  ];

  const exchangeColumns = [
    {
      key: "rate",
      title: "السعر الحالي",
      width: "150px",
      render: (value) => (
        <p className="text-blue-700">{value}</p>
      ),
    },

    {
      key: "previous_rate",
      title: "السعر القديم",
      width: "150px",
    },

    {
      key: "change_percentage",
      title: "التغيير (%)",
      width: "150px",
    },
  ];

  return [
    ...baseColumns,

    ...(showExchangeColumns ? exchangeColumns : []),

    {
      key: "time",
      title: "الوقت",
      width: "200px",
    },
  ];
};
 
  


const notesMap = {
  "critical-up": {
    text: "تحسن قوي جداً في سعر الصرف",
    className: "text-green-700 font-bold",
  },

  "warning-up": {
    text: "تحسن ملحوظ في سعر الصرف",
    className: "text-green-600 font-semibold",
  },

  "positive-up": {
    text: "تحسن بسيط في سعر الصرف",
    className: "text-green-500",
  },

  "critical-down": {
    text: "تدهور قوي جداً في سعر الصرف",
    className: "text-red-700 font-bold",
  },

  "warning-down": {
    text: "تدهور ملحوظ في سعر الصرف",
    className: "text-red-600 font-semibold",
  },

  "negative-down": {
    text: "تدهور بسيط في سعر الصرف",
    className: "text-red-500",
  },

  stable: {
    text: "بدون تغيير",
    className: "text-gray-400",
  },
};

export const exchangeratescols = [
  {
    key: "rate",
    title: "السعر الحالي",
    width: "120px",
  },

  {
    key: "previous_rate",
    title: "السعر السابق",
    width: "120px",
  },

  {
    key: "change_amount",
    title: "الفرق",
    width: "120px",

    render: (value) => {
      const amount = Number(value || 0);

      return (
        <span
          className={
            amount < 0
              ? "text-green-600 font-medium"
              : amount > 0
              ? "text-red-600 font-medium"
              : "text-gray-500"
          }
        >
          {amount}
        </span>
      );
    },
  },

  {
    key: "change_percentage",
    title: "(%)",
    width: "100px",

    render: (value) => {
      const percentage = Number(value || 0);

      return (
        <span
          className={
            percentage < 0
              ? "text-green-600 font-medium"
              : percentage > 0
              ? "text-red-600 font-medium"
              : "text-gray-500"
          }
        >
          {Math.abs(percentage).toFixed(2)}
        </span>
      );
    },
  },

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  {
    key: "result",
    title: "الحالة",
    width: "100px",

    render: (value) => {
      if (value === "up") {
        return (
          <TrendingUp className="w-6 h-6 text-green-500" />
        );
      }

      if (value === "down") {
        return (
          <TrendingDown className="w-6 h-6 text-red-500" />
        );
      }

      return (
        <Minus className="w-6 h-6 text-gray-400" />
      );
    },
  },

  {
    key: "created_at",
    title: "الوقت",
    width: "170px",

    render: (value) =>
      dayjs(value).format("HH:mm DD/MM"),
  },

  /*
  |--------------------------------------------------------------------------
  | NOTES
  |--------------------------------------------------------------------------
  */

  {
    key: "notes",
    title: "ملاحظات",
    width: "500px",

    render: (value) => {
      const note = notesMap[value] || notesMap.stable;

      return (
        <p className={note.className}>
          {note.text}
        </p>
      );
    },
  },
];
 

  