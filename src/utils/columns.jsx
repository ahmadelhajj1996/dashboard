export const categorycols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "name",
    title: "الاسم",

    width: "200px",
  },

  {
    key: "type",
    title: "النوع",
    width: "150px",
  },
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
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const categories = [
  {
    id: 1,
    name: "ملابس نسائية",
    type: "رئيسي",
    is_active: true,
  },
  {
    id: 2,
    name: "اطفال",
    type: "رئيسي",
    is_active: true,
  },
  {
    id: 3,
    name: "حمال",
    type: "رئيسي",
    is_active: true,
  },
  {
    id: 4,
    name: "اكسسوارات",
    type: "رئيسي",
    is_active: true,
  },
  {
    id: 5,
    name: "عطور",
    type: "رئيسي",
    is_active: false,
  },
];

export const subcategorycols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "name",
    title: "الاسم",
    width: "200px",
  },

  {
    key: "type",
    title: "النوع",
    width: "150px",
  },
  {
    key: "number",
    title: "عدد المنتجات",
    width: "150px",
  },
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
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const subcategories = [
  {
    id: 1,
    name: "سترات",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 2,
    name: "جواكيت",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 3,
    name: "جينزات",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 4,
    name: "فساتين",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 5,
    name: "بنطلون",
    type: "فرعي",
    number: "500",
    is_active: false,
  },
  {
    id: 6,
    name: "بلوزات",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 7,
    name: "تنانير",
    type: "فرعي",
    number: "500",
    is_active: true,
  },
  {
    id: 8,
    name: "داخلي",
    type: "فرعي",
    number: "500",
    is_active: false,
  },
];

export const attributecols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "name",
    title: "الاسم",
    width: "200px",
  },

  {
    key: "actions",
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const attributes = [
  {
    id: 1,
    name: "المقاس",
    slug: "size",
    type: "المقاس",
  },
  {
    id: 2,
    name: "اللون",
    slug: "color",
    type: "color",
  },
  {
    id: 3,
    name: "الخامات",
    slug: "material",
    type: "select",
  },
  {
    id: 4,
    name: "النمط",
    slug: "style",
    type: "select",
  },
  {
    id: 5,
    name: "نص مخصص",
    slug: "custom-text",
    type: "text",
  },
  {
    id: 6,
    name: "التشطيب",
    slug: "finish",
    type: "select",
  },
  {
    id: 7,
    name: "النقش",
    slug: "pattern",
    type: "select",
  },
  {
    id: 8,
    name: "نص الحفر",
    slug: "engraving-text",
    type: "text",
  },
  {
    id: 9,
    name: "لون الإطار",
    slug: "frame-color",
    type: "color",
  },
  {
    id: 10,
    name: "الطول",
    slug: "length",
    type: "size",
  },
];

export const optioncols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "name",
    title: "الاسم",
    width: "200px",
  },
  {
    key: "value",
    title: "القيمة",
    width: "200px",
  },
  {
    key: "actions",
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const options = [
  {
    id: 1,
    name: "المقاس",
    value: ["صغير ", "متوسط , ", "كبير , ", "XL , ", "XXL"],
  },
  {
    id: 2,
    name: "اللون  ",
    value: ["أحمر , ", "أزرق , ", "أخضر , ", "أسود , ", "أبيض"],
  },
  {
    id: 3,
    name: "الخامات   ",
    value: ["قطن , ", "جلد , ", "بوليستر , ", "صوف , ", "حرير"],
  },
  {
    id: 4,
    name: "النمط   ",
    value: ["كلاسيكي , ", "حديث , ", "رياضي , ", "أنيق , ", "عصري"],
  },
  {
    id: 5,
    name: "نص مخصص   ",
    value: ["مرحباً , ", "مخصص , ", "اسم العميل , ", "تاريخ , ", "رسالة خاصة"],
  },
  {
    id: 6,
    name: "التشطيب  ",
    value: ["لامع , ", "غير لامع , ", "مطفي , ", "مصقول , ", "خشن"],
  },
  {
    id: 7,
    name: "النقش   ",
    value: ["مخطط , ", "منقط , ", "مربعات , ", "مجرد , ", "زهوري"],
  },
  {
    id: 8,
    name: "نص الحفر  ",
    value: ["اسم , ", "رمز , ", "تاريخ , ", "عبارة , ", "شعار"],
  },
  {
    id: 9,
    name: "لون الإطار  ",
    value: ["ذهبي , ", "فضي , ", "أسود , ", "أبيض , ", "خشبي"],
  },
  {
    id: 10,
    name: "الطول   ",
    value: ["قصير , ", "متوسط , ", "طويل , ", "قابل للتعديل , ", "مخصص"],
  },
];

export const variationcols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "image",
    title: "الصورة",
    width: "200px",
  },
  {
    key: "product_id",
    title: "رقم المنتج",
    width: "100px",
  },
  {
    key: "price",
    title: "السعر",
    width: "100px",
  },
  {
    key: "quantity",
    title: "الكمية",
    width: "100px",
  },

  {
    key: "actions",
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const variations = [
  {
    id: 1,
    product_id: 1,
    sku: "PROD-001-S-MED",
    price: 29.99,
    quantity: 50,
    image: "products/prod-001-medium.jpg",
  },
  {
    id: 2,
    product_id: 1,
    sku: "PROD-001-L-LRG",
    price: 34.99,
    quantity: 35,
    image: "products/prod-001-large.jpg",
  },
  {
    id: 3,
    product_id: 2,
    sku: "PROD-002-RED",
    price: 19.99,
    quantity: 100,
    image: "products/prod-002-red.jpg",
  },
  {
    id: 4,
    product_id: 2,
    sku: "PROD-002-BLU",
    price: 19.99,
    quantity: 85,
    image: "products/prod-002-blue.jpg",
  },
  {
    id: 5,
    product_id: 3,
    sku: "PROD-003-COTN",
    price: 45.0,
    quantity: 0,
    image: "products/prod-003-cotton.jpg",
  },
  {
    id: 6,
    product_id: 3,
    sku: "PROD-003-LEAT",
    price: 89.99,
    quantity: 20,
    image: "products/prod-003-leather.jpg",
  },
  {
    id: 7,
    product_id: 4,
    sku: "PROD-004-CLAS",
    price: 59.99,
    quantity: 45,
    image: "products/prod-004-classic.jpg",
  },
  {
    id: 8,
    product_id: 5,
    sku: "PROD-005-CSTM",
    price: 14.99,
    quantity: 200,
    image: null,
  },
  {
    id: 9,
    product_id: 6,
    sku: "PROD-006-SML",
    price: 39.99,
    quantity: 60,
    image: "products/prod-006-small.jpg",
  },
  {
    id: 10,
    product_id: 6,
    sku: "PROD-006-LRG",
    price: 49.99,
    quantity: 40,
    image: "products/prod-006-large.jpg",
  },
];

export const ordercols = [
  {
    key: "order_number",
    title: "#",
    width: "100px",
  },
  {
    key: "user_id",
    title: "المستخدم",
    width: "100px",
  },
  {
    key: "status",
    title: "حالة الطلب",
    width: "100px",
  },
  {
    key: "grand_total",
    title: "السعر",
    width: "100px",
  },
  {
    key: "item_count",
    title: "عدد العناصر",
    width: "100px",
  },

  {
    key: "actions",
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const orders = [
  {
    id: 1,
    user_id: 101,
    order_number: "ORD-2024-00001",
    status: "completed",
    subtotal: 149.99,
    tax: 22.5,
    shipping_cost: 5.99,
    discount: 10.0,
    grand_total: 168.48,
    item_count: 3,
    payment_method: "cash",
  },
  {
    id: 2,
    user_id: 102,
    order_number: "ORD-2024-00002",
    status: "pending",
    subtotal: 89.99,
    tax: 13.5,
    shipping_cost: 0.0,
    discount: 0.0,
    grand_total: 103.49,
    item_count: 2,
    payment_method: "cash",
  },
  {
    id: 3,
    user_id: 103,
    order_number: "ORD-2024-00003",
    status: "processing",
    subtotal: 299.99,
    tax: 45.0,
    shipping_cost: 12.99,
    discount: 25.0,
    grand_total: 332.98,
    item_count: 5,
    payment_method: "cash",
  },
  {
    id: 4,
    user_id: 101,
    order_number: "ORD-2024-00004",
    status: "declined",
    subtotal: 59.99,
    tax: 9.0,
    shipping_cost: 4.99,
    discount: 0.0,
    grand_total: 73.98,
    item_count: 1,
    payment_method: "cash",
  },
  {
    id: 5,
    user_id: 104,
    order_number: "ORD-2024-00005",
    status: "refunded",
    subtotal: 199.99,
    tax: 30.0,
    shipping_cost: 8.99,
    discount: 15.0,
    grand_total: 223.98,
    item_count: 4,
    payment_method: "cash",
  },
  {
    id: 6,
    user_id: 105,
    order_number: "ORD-2024-00006",
    status: "completed",
    subtotal: 499.99,
    tax: 75.0,
    shipping_cost: 0.0,
    discount: 50.0,
    grand_total: 524.99,
    item_count: 7,
    payment_method: "cash",
  },
  {
    id: 7,
    user_id: 102,
    order_number: "ORD-2024-00007",
    status: "pending",
    subtotal: 34.99,
    tax: 5.25,
    shipping_cost: 3.99,
    discount: 0.0,
    grand_total: 44.23,
    item_count: 1,
    payment_method: "cash",
  },
  {
    id: 8,
    user_id: 106,
    order_number: "ORD-2024-00008",
    status: "processing",
    subtotal: 149.99,
    tax: 22.5,
    shipping_cost: 7.99,
    discount: 10.0,
    grand_total: 170.48,
    item_count: 3,
    payment_method: "cash",
  },
  {
    id: 9,
    user_id: 107,
    order_number: "ORD-2024-00009",
    status: "completed",
    subtotal: 79.99,
    tax: 12.0,
    shipping_cost: 5.99,
    discount: 5.0,
    grand_total: 92.98,
    item_count: 2,
    payment_method: "cash",
  },
  {
    id: 10,
    user_id: 103,
    order_number: "ORD-2024-00010",
    status: "declined",
    subtotal: 399.99,
    tax: 60.0,
    shipping_cost: 14.99,
    discount: 30.0,
    grand_total: 444.98,
    item_count: 6,
    payment_method: "cash",
  },
  {
    id: 11,
    user_id: 108,
    order_number: "ORD-2024-00011",
    status: "refunded",
    subtotal: 124.99,
    tax: 18.75,
    shipping_cost: 6.99,
    discount: 0.0,
    grand_total: 150.73,
    item_count: 2,
    payment_method: "cash",
  },
  {
    id: 12,
    user_id: 104,
    order_number: "ORD-2024-00012",
    status: "completed",
    subtotal: 699.99,
    tax: 105.0,
    shipping_cost: 0.0,
    discount: 100.0,
    grand_total: 704.99,
    item_count: 10,
    payment_method: "cash",
  },
];

export const usercols = [
  {
    key: "id",
    title: "#",
    width: "100px",
  },
  {
    key: "name",
    title: "الاسم",
    width: "100px",
  },
  {
    key: "phone",
    title: "الهاتف",
    width: "100px",
  },
  {
    key: "actions",
    title: "Actions",
    width: "120px",
    isActions: true,
  },
];

export const users = [
  { id: 1, name: "John Smith", phone: "555-0101" },
  { id: 2, name: "Emma Johnson", phone: "555-0102" },
  { id: 3, name: "Michael Brown", phone: "555-0103" },
  { id: 4, name: "Sophia Garcia", phone: "555-0104" },
  { id: 5, name: "William Jones", phone: "555-0105" },
  { id: 6, name: "Olivia Martinez", phone: "555-0106" },
  { id: 7, name: "James Davis", phone: "555-0107" },
  { id: 8, name: "Isabella Rodriguez", phone: "555-0108" },
  { id: 9, name: "Robert Wilson", phone: "555-0109" },
  { id: 10, name: "Mia Anderson", phone: "555-0110" },
  { id: 11, name: "David Taylor", phone: "555-0111" },
  { id: 12, name: "Charlotte Thomas", phone: "555-0112" },
  { id: 13, name: "Joseph Moore", phone: "555-0113" },
  { id: 14, name: "Amelia Jackson", phone: "555-0114" },
  { id: 15, name: "Daniel White", phone: "555-0115" },
  { id: 16, name: "Harper Harris", phone: "555-0116" },
];

export const productcols = [
  {
    key: "id",
    title: "#",
    width: "80px",
  },
  {
    key: "featured_image",
    title: "الصورة",
    width: "100px",
    isImage: true,
  },
  {
    key: "name",
    title: "اسم المنتج",
    width: "200px",
  },
  {
    key: "sku",
    title: "SKU",
    width: "120px",
  },
  {
    key: "price",
    title: "السعر",
    width: "120px",
    isPrice: true,
  },

  {
    key: "quantity",
    title: "الكمية",
    width: "100px",
  },
  {
    key: "status",
    title: "الحالة",
    width: "120px",
    isBadge: true,
  },
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
    title: "نشط",
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

export const products = [
  {
    category_id: 1,
    name: "فستان سهرة طويل مخمل",
    slug: "fstan-sahra-tawil-mukhamal",
    description:
      "فستان سهرة أنيق مصنوع من المخمل الفاخر، مناسب للمناسبات الرسمية وحفلات الزفاف. يتميز بقصة كلاسيكية وأكمام طويلة.",
    short_description: "فستان مخمل أنيق للسهرات",
    price: 450.0,
    compare_price: 650.0,
    sku: "WDR-1001",
    barcode: "6281002001234",
    quantity: 15,
    weight: 0.85,
    featured_image: "images/products/fstan-mukhamal.jpg",
    gallery: ["images/gallery/fstan1.jpg", "images/gallery/fstan2.jpg"],
    status: "published",
    is_featured: true,
    is_active: true,
    view_count: 320,
  },
  {
    category_id: 2,
    name: "عطر ورد عربي شرقي",
    slug: "atr-ward-arabi-sharqi",
    description:
      "عطر نسائي بتركيبة شرقية تجمع بين الورد البلدي، العود، المسك والعنبر. ثبات طويل وفوحان مميز.",
    short_description: "عطر شرقي بلمسة وردية",
    price: 299.0,
    compare_price: 450.0,
    sku: "PER-2055",
    barcode: "6281002005678",
    quantity: 42,
    weight: 0.12,
    featured_image: "images/products/atr-ward.jpg",
    gallery: ["images/gallery/atr1.jpg", "images/gallery/atr2.jpg"],
    status: "published",
    is_featured: true,
    is_active: true,
    view_count: 510,
  },
  {
    category_id: 3,
    name: "أحمر شفاه سائل مات",
    slug: "ahmar-shfah-sayel-mat",
    description:
      "أحمر شفاه سائل غير لامع يدوم طوال اليوم. تركيبة خفيفة على الشفاه ولا تسبب الجفاف. درجة ٥٠٥ - أحمر غامق.",
    short_description: "أحمر شفاه سائل يدوم 12 ساعة",
    price: 85.0,
    compare_price: null,
    sku: "MUP-3344",
    barcode: "6281002009987",
    quantity: 120,
    weight: 0.02,
    featured_image: "images/products/ahmar-shfah.jpg",
    gallery: ["images/gallery/ahmar1.jpg"],
    status: "published",
    is_featured: false,
    is_active: true,
    view_count: 890,
  },
  {
    category_id: 1,
    name: "طقم كاجوال قطني",
    slug: "takam-casual-qutni",
    description:
      "طقم مكون من تيشيرت وبنطلون قطن مريح، مناسب للإطلالات اليومية والبيت. ألوان متعددة.",
    short_description: "طقم قطني مريح للمنزل والخروج",
    price: 210.0,
    compare_price: 320.0,
    sku: "WDR-1102",
    barcode: "6281002001241",
    quantity: 37,
    weight: 1.1,
    featured_image: "images/products/takam-casual.jpg",
    gallery: [
      "images/gallery/takam1.jpg",
      "images/gallery/takam2.jpg",
      "images/gallery/takam3.jpg",
    ],
    status: "published",
    is_featured: false,
    is_active: true,
    view_count: 145,
  },
  {
    category_id: 2,
    name: "عطر لافندر فرنسي",
    slug: "atr-lavender-faransi",
    description:
      "عطر زهري منعش بمكونات اللافندر، الياسمين، والفانيليا. مناسب للاستخدام اليومي في الربيع والصيف.",
    short_description: "عطر فرنسي برائحة اللافندر",
    price: 179.0,
    compare_price: 250.0,
    sku: "PER-2060",
    barcode: "6281002005692",
    quantity: 63,
    weight: 0.11,
    featured_image: "images/products/atr-lavender.jpg",
    gallery: ["images/gallery/lav1.jpg"],
    status: "published",
    is_featured: false,
    is_active: true,
    view_count: 278,
  },
  {
    category_id: 3,
    name: "لوحة ظلال عيون 12 لون",
    slug: "lawha-dhalal-oyoun-12-lawn",
    description:
      "لوحة ظلال عيون احترافية ألوان ترابية وبودرة ناعمة قابلة للدمج. ثابتة طوال اليوم.",
    short_description: "باليتة ألوان عيون 12 لون ترابي",
    price: 145.0,
    compare_price: 199.0,
    sku: "MUP-3350",
    barcode: "6281002009994",
    quantity: 88,
    weight: 0.08,
    featured_image: "images/products/dhalal-oyoun.jpg",
    gallery: ["images/gallery/dhalal1.jpg", "images/gallery/dhalal2.jpg"],
    status: "published",
    is_featured: true,
    is_active: true,
    view_count: 642,
  },
  {
    category_id: 4,
    name: "حقيبة جلد طبيعي كبيرة",
    slug: "hakiba-jild-tabiee-kabira",
    description:
      "حقيبة يد أنيقة من الجلد الطبيعي الفاخر، مناسبة للعمل والخروجات اليومية. تتسع للابتوب والأغراض الشخصية.",
    short_description: "حقيبة جلد طبيعي عملية وأنيقة",
    price: 550.0,
    compare_price: 799.0,
    sku: "BAG-4401",
    barcode: "6281003004455",
    quantity: 12,
    weight: 1.2,
    featured_image: "images/products/hakiba-jild.jpg",
    gallery: ["images/gallery/hakiba1.jpg", "images/gallery/hakiba2.jpg"],
    status: "published",
    is_featured: true,
    is_active: true,
    view_count: 401,
  },
  {
    category_id: 1,
    name: "جاكيت جينز ممزق",
    slug: "jaket-jeans-mumazaq",
    description:
      "جاكيت جينز بتصميم عصري وممزق قليلاً، يناسب إطلالة الكاجوال والموضة الشبابية.",
    short_description: "جاكيت جينز ستريت ستايل",
    price: 280.0,
    compare_price: null,
    sku: "WDR-1115",
    barcode: "6281002001258",
    quantity: 24,
    weight: 0.95,
    featured_image: "images/products/jaket-jeans.jpg",
    gallery: ["images/gallery/jeans1.jpg"],
    status: "published",
    is_featured: false,
    is_active: true,
    view_count: 198,
  },
  {
    category_id: 3,
    name: "ماسكارا كثافة وحجم فائق",
    slug: "mascara-kathafa-hajm-faeq",
    description:
      "ماسكارا تطويل وتكثيف للرموش بمكونات مرطبة. فرشاة منحنية تصل إلى أدق الرموش.",
    short_description: "ماسكارا سوداء مقاومة للماء",
    price: 65.0,
    compare_price: 95.0,
    sku: "MUP-3362",
    barcode: "6281002009970",
    quantity: 200,
    weight: 0.03,
    featured_image: "images/products/mascara.jpg",
    gallery: ["images/gallery/mascara1.jpg"],
    status: "published",
    is_featured: false,
    is_active: true,
    view_count: 1150,
  },
  {
    category_id: 2,
    name: "دهن عود كمبودي خالص",
    slug: "dahn-oud-cambodi-khales",
    description:
      "دهن عود كمبودي درجة أولى، فاخر ومناسب للمناسبات والهدايا الثمينة. ثبات يدوم لأكثر من ٢٤ ساعة.",
    short_description: "دهن عود كمبودي أصلي",
    price: 850.0,
    compare_price: 1200.0,
    sku: "PER-2077",
    barcode: "6281002005708",
    quantity: 5,
    weight: 0.05,
    featured_image: "images/products/dahn-oud.jpg",
    gallery: ["images/gallery/oud1.jpg", "images/gallery/oud2.jpg"],
    status: "published",
    is_featured: true,
    is_active: true,
    view_count: 367,
  },
];
