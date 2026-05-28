import clsx from "clsx";
import PropTypes from "prop-types";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  disabled = false,
  className = "",
  name,
  ...props
}) {
  return (
    <div className="w-full" >
      {label && (
        <label
          htmlFor={name}
          className="label flex justify-start"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          onChange?.(e.target.value, e)
        }
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "field ",
          error && "border-red-500",
          className
        )}
        {...props}
      />

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
};

      // Simple Controlled Input
      // <Input
      //   label="Name"
      //   name="name"
      //   placeholder="Enter your name"
      //   value={name}
      //   onChange={setName}
      // />

// import { useState } from "react";
// import Input from "../components/Input";


// const products = [
//   { id: 1, name: "Laptop" },
//   { id: 2, name: "Mouse" },
//   { id: 3, name: "Keyboard" },
// ];

// export default function ProductSearch() {
//   const [search, setSearch] =
//     useState("");

//   const filteredProducts =
//     products.filter((product) =>
//       product.name
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );

//   return (
//     <div className="space-y-4">
//       <Input
//         label="Search Products"
//         placeholder="Search..."
//         value={search}
//         onChange={setSearch}
//       />

//       <div className="space-y-2">
//         {filteredProducts.map(
//           (product) => (
//             <div key={product.id}>
//               {product.name}
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }