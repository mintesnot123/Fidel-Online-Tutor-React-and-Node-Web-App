import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import CustomerList from "src/pages/CustomerList";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import { AuthContext } from "src/helpers/AuthContext";
import AdminTutors from "src/pages/adminPages/TutorsPage";
import AdminAddTutors from "src/pages/adminPages/AddTutorPage";

const PrivateElement = ({ element, requiredRoles }) => {
    const { authState } = useContext(AuthContext);
    let location = useLocation();
    if (!authState) return <p className="container">Checking auth..</p>;
    const { status, role } = authState;

    return status ? (
        requiredRoles.includes(role) ? (
            element
        ) : (
            <Navigate to="/" state={{ from: location }} />
        )
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

const PublicElement = ({ element }) => {
    const { authState } = useContext(AuthContext);
    let location = useLocation();
    if (!authState) return <p className="container">Checking auth..</p>;
    const { status, role } = authState;

    return status ? <Navigate to="/" state={{ from: location }} /> : element;
};

const routes = [
    {
        path: "app",
        element: <DashboardLayout />,
        children: [
            {
                path: "account",
                element: (
                    <PrivateElement
                        element={<Account />}
                        requiredRoles={["student", "tutor"]}
                    />
                ),
            },
            {
                path: "customers",
                element: (
                    <PrivateElement
                        element={<CustomerList />}
                        requiredRoles={["admin"]}
                    />
                ),
            },
            {
                path: "admin_tutors",
                element: (
                    <PrivateElement
                        element={<AdminTutors />}
                        requiredRoles={["admin"]}
                    />
                ),
            },
            {
                path: "admin_tutors_create",
                element: (
                    <PrivateElement
                        element={<AdminAddTutors />}
                        requiredRoles={["admin"]}
                    />
                ),
            },
            { path: "dashboard", element: <Dashboard /> },
            { path: "products", element: <ProductList /> },
            { path: "settings", element: <Settings /> },
            { path: "*", element: <Navigate to="/404" /> },
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "login", element: <PublicElement element={<Login />} /> },
            {
                path: "register",
                element: <PublicElement element={<Register />} />,
            },
            { path: "404", element: <NotFound /> },
            { path: "/", element: <Navigate to="/app/dashboard" /> },
            { path: "*", element: <Navigate to="/404" /> },
        ],
    },
];

export default routes;
