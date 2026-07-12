import "./Button.css";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    onClick,
    loading = false,
    disabled = false,
    fullWidth = false
}) => {

return (
<button type={type} onClick={onClick} disabled={disabled || loading}
className={`
    custom-btn
    ${variant}
    ${fullWidth ? "full-width" : ""}`}>
{ loading ? <span className="btn-loader">Loading...</span> :children }

</button>
);
};

export default Button;