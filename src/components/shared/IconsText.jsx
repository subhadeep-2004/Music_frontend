import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
function IconText(props) {

    const text_color=props.active==true? "text-white": "text-gray-400";


    return(

        <Link to={props.targetLink} className="block">
        <div className="flex justify-start items-center m-2 cursor-pointer"
        // for on click if the props.onclick function exist then execute it or else null
        //for  the playList Modal view
        onClick={props.onClick?props.onClick:null}> 
        <div className='p-1'>
           <Icon icon={props.name} color="grey" fontSize={15}/>
        </div>
        <div className={`text-sm font-semibold ${text_color} hover:text-white`}>{props.text}</div>
        </div>
        </Link>



    )
}


export default IconText