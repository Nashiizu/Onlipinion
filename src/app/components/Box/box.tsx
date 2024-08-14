import "./box.css";

interface BoxProps {
    className: string;
};

function Box(props: BoxProps) {
    return (
        <div className={props.className}></div>
    );
};
export default Box;