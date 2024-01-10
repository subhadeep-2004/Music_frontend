
function TextWithHover(props) {

   

    return(
        <div className="flex justify-start items-center m-2 cursor-pointer"> 
        <div className='p-1'>
           <Icon icon={props.name} color="grey" fontSize={15}/>
        </div>
        <div className={`text-xs font-semibold text-gray-400 hover:text-white`}>{props.text}</div>
        </div>




    )
}


export default TextWithHover