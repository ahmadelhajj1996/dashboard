import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./config/router";

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <div dir="rtl">

        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRoutes />
            </PersistGate>
            <ToastContainer stacked transition={Flip} />
          </Provider>
        </QueryClientProvider>
 
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
