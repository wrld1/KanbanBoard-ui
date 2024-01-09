import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import BoardPage from "@/components/BoardPage";
import BoardsListPage from "@/components/BoardsListPage";

const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <BoardsListPage />
      </Layout>
    ),
  },
  {
    path: "boards/:boardId",
    element: (
      <Layout>
        <BoardPage />
      </Layout>
    ),
  },

  {
    path: "*",
    element: (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    ),
  },
]);

export default routerRoot;
