import "./CustomSelect.css";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange }) => {
    return (
        <div className="custom-select-wrapper">
            <select className="form-select custom-select-style" value={value} onChange={onChange}>
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CustomSelect;