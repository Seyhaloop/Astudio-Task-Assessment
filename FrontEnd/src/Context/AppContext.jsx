import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

const AppContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || "https://dummyjson.com";
const DEBOUNCE_DELAY = 350;

export function AppProvider({ children }) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [entity, setEntity] = useState("users");
  const [categories, setCategories] = useState([]);
  const [bloods] = useState(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);
  const [genders] = useState(["male", "female"]);

  const [serverFilter, setServerFilter] = useState({ field: "", value: "" });
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Use ref to track the latest request to avoid race conditions
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    async ({
      pageSize: ps = pageSize,
      page: p = page,
      entity: e = entity,
      serverFilterLocal = serverFilter,
    } = {}) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const skip = (p - 1) * ps;
        let url = `${API_BASE}/${e}`;
        const params = { limit: ps, skip };

        if (serverFilterLocal?.field && serverFilterLocal?.value) {
          if (e === "products" && serverFilterLocal.field === "category") {
            url = `${API_BASE}/products/category/${serverFilterLocal.value}`;
          } else if (e === "users") {
            url = `${API_BASE}/users/filter`;
            params.key = serverFilterLocal.field;
            params.value = serverFilterLocal.value;
          } else {
            url = `${API_BASE}/${e}/search`;
            params.q = serverFilterLocal.value;
          }
        }

        const qs = new URLSearchParams(params).toString();
        const finalUrl = `${url}?${qs}`;

        const res = await axios.get(finalUrl, {
          signal: abortControllerRef.current.signal,
        });

        const list = res.data.users || res.data.products || res.data;
        const totalCount =
          typeof res.data.total === "number" ? res.data.total : 0;

        setData(Array.isArray(list) ? list : []);
        setTotal(totalCount);
      } catch (err) {
        if (err.name === "CanceledError") {
          return;
        }
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
        setData([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, page, entity, serverFilter]
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const res = await axios.get(`${API_BASE}/products/categories`);
        if (!cancelled) {
          setCategories(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch categories:", err);
          setCategories([]);
        }
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize, serverFilter, entity]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      pageSize,
      setPageSize,
      page,
      setPage,
      data,
      total,
      loading,
      error,
      entity,
      setEntity,
      categories,
      bloods,
      genders,
      serverFilter,
      setServerFilter,
      showSearch,
      setShowSearch,
      searchText,
      setSearchText,
      fetchData,
    }),
    [
      pageSize,
      page,
      data,
      total,
      loading,
      error,
      entity,
      categories,
      bloods,
      genders,
      serverFilter,
      showSearch,
      searchText,
      fetchData,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
