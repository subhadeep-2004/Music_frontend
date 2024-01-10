function TextInput (props){
    

    return (  

            <div  className="TextInput flex flex-col space-y-1 font-semibold w-full text-xs">

            <label htmlFor={props.placeholderName}  className={`text-sm ${props.labelClassName}`} > {props.label} </label>
            <input id={props.placeholderName}  type="text" placeholder={props.placeholderName} className="input h-1/3  p-4 border border-gray-400 border-solid rounded "
            value={props.value}

            // At each change the state of my previous input is gonna change with the help of the setValue function
            onChange={(e)=>{
                props.setValue(e.target.value);
                console.log(e.target.value);
                
            }}
            
            />

            </div>

    )
}



export default TextInput;
