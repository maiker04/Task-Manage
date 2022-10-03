import './input.css';

const Descript = ({ label, ...rest }) => {
    return (
        <div className='field'>
            <label>{label}</label>
            <textarea {...rest} />
        </div>
    );
}

export default Descript;