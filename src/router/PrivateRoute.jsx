import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if(!user && !loading) return  <Navigate to="/login" replace />

    return (
        children
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired,
}

export default PrivateRoute;