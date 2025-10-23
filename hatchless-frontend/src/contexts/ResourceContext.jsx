import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import useResources from "../hooks/useResources.js";

const ResourceContext = createContext(null);

export const ResourceProvider = ({ resourceName, children, initialParams = {} }) => {
  const [page, setPage] = useState(initialParams.page || 1);
  const [perPage, setPerPage] = useState(initialParams.perPage || 10);
  const [sortColumn, setSortColumn] = useState(initialParams.sortColumn || "id");
  const [sortDirection, setSortDirection] = useState(initialParams.sortDirection || "desc");
  const [filters, setFilters] = useState(initialParams.filters || {});
  const [scopes, setScopes] = useState(initialParams.scopes || []);
  const [search, setSearch] = useState(initialParams.search || "");
  const [searchColumn, setSearchColumn] = useState(initialParams.searchColumn || null);
  const [extraParams, setExtraParams] = useState(initialParams.extraParams || {});

  const updateExtraParams = useCallback(
    (newParams) => setExtraParams((prev) => ({ ...prev, ...newParams })),
    []
  );

  const queryParams = useMemo(() => ({
    page,
    perPage,
    sortColumn,
    sortDirection,
    filters,
    scopes,
    search,
    searchColumn,
    extraParams,
  }), [page, perPage, sortColumn, sortDirection, filters, scopes, search, searchColumn, extraParams]);

  const resources = useResources({ resourceName, ...queryParams });

  const contextValue = {
    ...resources,
    page,
    perPage,
    sortColumn,
    sortDirection,
    filters,
    scopes,
    search,
    searchColumn,
    extraParams,
    setPage,
    setPerPage,
    setSortColumn,
    setSortDirection,
    setFilters,
    setScopes,
    setSearch,
    setSearchColumn,
    setExtraParams: updateExtraParams,
  };

  return (
    <ResourceContext.Provider value={contextValue}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResourceContext must be used within a ResourceProvider");
  }
  return context;
};