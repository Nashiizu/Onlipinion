import "./text.css";

interface TextProps {
    className: string;
    children?: React.ReactNode;
};

function Text(props: TextProps) {
    return (
        <div className={props.className}>{props.children}</div>
    );
};

export default Text;