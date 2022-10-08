const RadioButton = ({ label, value, onChange }) => {
    return (
      <label>
        <input className=" w3-radio w3-deep-orange" type="radio" checked={value} onChange={onChange} />
        <label style={{
            'fontSize': '1rem'
        }}>{label}</label>
      </label>
    );
  }

  export default RadioButton