import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";

const ProtectedPageWrapper = ({ children }) => {
    return (
        <BrowserRouter>
            <ProtectedPage>{children}</ProtectedPage>
        </BrowserRouter>
    );
};

export default ProtectedPageWrapper;