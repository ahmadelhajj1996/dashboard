import PropTypes from "prop-types";
import { Eye, Edit, Trash2 } from "lucide-react";

import { useState, useMemo } from "react";

const Table = ({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  className = "",
  emptyMessage = "لا توجد بيانات",
  rowsPerPage = 10,
  showPagination = true,
  paginationPosition = "bottom",
  actions = {
    showView: true,
    showEdit: true,
    showDelete: true,
    customActions: null,
  },
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = useMemo(() => {
    if (!showPagination || totalItems <= rowsPerPage) {
      return data;
    }
    return data?.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex, showPagination, rowsPerPage, totalItems]);

  useMemo(() => {
    setCurrentPage(1);
  }, [data?.length, rowsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Render action buttons based on configuration
  const renderActionButtons = (row) => {
    const buttons = [];

    // View button
    if (actions.showView && onView) {
      buttons.push(
        <button
          key="view"
          onClick={() => onView(row)}
          className="text-cyan-600 hover:text-cyan-800 transition-colors"
          title="View"
          type="button"
        >
          <Eye size={18} />
        </button>,
      );
    }

    // Edit button
    if (actions.showEdit && onEdit) {
      buttons.push(
        <button
          key="edit"
          onClick={() => onEdit(row)}
          className="text-cyan-600 hover:text-cyan-800 transition-colors"
          title="Edit"
          type="button"
        >
          <Edit size={18} />
        </button>,
      );
    }

    // Delete button
    if (actions.showDelete && onDelete) {
      buttons.push(
        <button
          key="delete"
          onClick={() => onDelete(row)}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete"
          type="button"
        >
          <Trash2 size={18} />
        </button>,
      );
    }

    // Custom actions
    if (actions.customActions) {
      const customButtons = actions.customActions(row);
      if (Array.isArray(customButtons)) {
        buttons.push(...customButtons);
      } else if (customButtons) {
        buttons.push(customButtons);
      }
    }

    return buttons;
  };

  const Pagination = () => {
    if (!showPagination || totalItems <= rowsPerPage) return null;

    return (
      <div className="flex items-center justify-center px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === 1
                ? "inactive hover:bg-inherit text-gray-500 hover:text-gray-500 cursor-not-allowed"
                : "active text-gray-900 bg-gray-50 hover:bg-inherit"
            }`}
            type="button"
          >
            السابق
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && goToPage(page)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentPage === page ? "active" : "inactive"
              }`}
              disabled={typeof page !== "number"}
              type="button"
            >
              {page}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? "inactive hover:bg-inherit text-gray-500 hover:text-gray-500 cursor-not-allowed"
                : "active text-gray-900 bg-gray-50 hover:bg-inherit"
            }`}
            type="button"
          >
            التالي
          </button>
        </div>
      </div>
    );
  };

  const TopPagination = () => {
    if (paginationPosition === "top" || paginationPosition === "both") {
      return <Pagination />;
    }
    return null;
  };

  const BottomPagination = () => {
    if (paginationPosition === "bottom" || paginationPosition === "both") {
      return <Pagination />;
    }
    return null;
  };

  return (
    <div className={`${className} p-8`}>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <TopPagination />

        <table className="min-w-full bg-white">
          <thead className="bg-cyan-600 bordered text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  style={{ width: column.width }}
                  className="px-6 py-3 text-start text-xs font-medium  uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentData?.length === 0 ? (
              <tr>
                          <td
                            colSpan={columns.length}
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            {emptyMessage}
                          </td>
                        </tr>
                      ) : (
                        currentData?.map((row, rowIndex) => (
                          <tr
                            key={row.id || rowIndex}
                            className={`
                    transition-colors 
                    ${rowIndex % 2 !== 0 ? "bg-cyan-50" : "bg-white"}
                  `}
                >
                  {columns.map((column, colIndex) => {
                    if (column.render) {
                      return (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          {column.render(row[column.key], row)}
                        </td>
                      );
                    }

                    if (column.isActions) {
                      return (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="px-6 py-4 text-sm text-gray-900"
                        >
                          <div className="flex items-center gap-2">
                            {renderActionButtons(row)}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        className="px-6 py-4 text-sm text-gray-900"
                      >
                        {row[column.key]}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>

        </table>

        <BottomPagination />
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      render: PropTypes.func,
      isActions: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  paginationPosition: PropTypes.oneOf(["top", "bottom", "both"]),
  actions: PropTypes.shape({
    showView: PropTypes.bool,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    customActions: PropTypes.func,
  }),
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      width: PropTypes.string,
      render: PropTypes.func,
      isActions: PropTypes.bool,
    }),
  ).isRequired,

  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  onView: PropTypes.func,

  onEdit: PropTypes.func,

  onDelete: PropTypes.func,

  className: PropTypes.string,

  emptyMessage: PropTypes.string,

  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  paginationPosition: PropTypes.oneOf(["top", "bottom", "both"]),
};

export default Table;
