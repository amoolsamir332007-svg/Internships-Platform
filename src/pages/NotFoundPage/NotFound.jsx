import { useNavigate } from "react-router-dom";
import "./NotFound.css";


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-page">
            <div className="notfound-card">
                <div className="error-number">
                    404
                </div>
                <h1>
                    Page Not Found
                </h1>
                <p>

                    Sorry, the page you are looking for
                    does not exist or has been moved.

                </p>
                <button

                    onClick={() => navigate("/")}

                >
                    Back To Home
                </button>
            </div>
        </div>


    );


};



export default NotFound;