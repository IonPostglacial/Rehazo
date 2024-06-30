import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./style.css";
import "./eyecandy.css";
import Root, { loader as rootLoader } from "./routes/root";
import TaxonView, { loader as taxonsLoader } from "./routes/taxons";

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Root />, 
        loader: rootLoader,
    },
    { 
        path: "/ds/:datasetId/taxons/:taxonId?", 
        element: <TaxonView />,
        loader: taxonsLoader,
    },
]);

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
