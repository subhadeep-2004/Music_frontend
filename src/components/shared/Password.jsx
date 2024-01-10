function Password (props){
    

    return (  

            <div  className="TextInput flex flex-col space-y-1 font-semibold w-full">

            <label htmlFor={props.placeholder} className="text-sm"> {props.label} </label>
            <input id={props.placeholder}  type="password" placeholder={props.placeholderName} className="input h-1/3 text-xs p-4 border border-gray-400 border-solid rounded "
            
            value={props.value}

            onChange={(e)=>{
                props.setValue(e.target.value);
                console.log(e.target.value);
                
            }}/>

            </div>

    )
}



export default Password;
