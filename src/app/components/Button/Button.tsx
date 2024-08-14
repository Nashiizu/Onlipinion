import "./button.css";

interface ButtonProps {
    className: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

function Button(props: ButtonProps) {
    return (
        <button className={props.className} onClick={props.onClick}>{props.children}</button>
    );
};
export default Button;