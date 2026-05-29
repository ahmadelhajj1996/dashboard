import { ToastContainer, Flip } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import { store, persistor } from "./store/store";

import AppRoutes from "./config/router";

import { NotificationProvider } from "./context/NotificationContext";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div dir="rtl">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>

      <ToastContainer
        stacked
        transition={Flip}
        position="top-right"
        autoClose={5000}
        rtl
      />
    </div>
  );
}

export default App;
