interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, type = "submit", ...rest }) => {
    return (
        <button
            className="btn w-100"
            style={{backgroundColor: "#d6d6d6", color: "#000000", borderColor: "#000000"}}
            type={type}
            {...rest}>
            {children}
        </button>
    );
}

export default PrimaryButton;