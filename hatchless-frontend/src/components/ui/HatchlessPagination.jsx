import { useCallback } from "react";
import { Pagination } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const HatchlessPagination = () => {
  const { page, setPage, totalPages } = useResourceContext();

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, [setPage]);


  return (
    <div className="center">
      {totalPages > 1 && <Pagination
        value={page}
        onChange={handlePageChange}
        total={totalPages}
        size="sm"
      />}
    </div>
  );
}

export default HatchlessPagination;