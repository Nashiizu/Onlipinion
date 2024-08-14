import "./input.css";

interface InputProps {
    className: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input(props: InputProps) {
    return (
        <input className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
    );
};
export default Input;