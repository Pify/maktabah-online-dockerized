import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search", value, onChange, }) => {
    return (
        <div className="mb-3 text-start position-relative mt-2">
            <FontAwesomeIcon
                className="position-absolute"
                style={{ top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#6c757d' }}
                icon={faSearch} />
            <input
                type='text'
                className='form-control rounded-pill ps-5 me-2'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} />
        </div>
    );
}

export default SearchInput;