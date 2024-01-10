import {openUploadWidget} from "../../util/CloudinaryService";
// import {cloudinary_upload_preset} from "../../config";

// const CloudinaryUpload = () => {

//     const uploadImageWidget = () => {
//         let myUploadWidget = openUploadWidget(
//             {
//                 cloudName: "cededwed",
//                 uploadPreset: "scc",
//                 sources: ["local"],
//             },
//             function (error, result) {
//                 if (!error && result.event === "success") {
//                  console.log(result.info);
//                 } else {
//                     alert("Could not upload")
//                     if (error) {
//                         console.log(error);
//                     }
//                 }
//             }
//         );
//         console.log(myUploadWidget);
//         myUploadWidget.open();
//     };
   
//     return (
//         <div className="flex w-full justify-end"> 
//         <button
//             className="button bg-emerald-300  my-4 font-semibold py-1 px-3  rounded-full"
//             onClick={uploadImageWidget}
//         >
//             Select Track
//         </button>
//         </div>
//     );
// };

// export default CloudinaryUpload;
import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId,setUrl,setName }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the  info: ", result.info);
            setUrl(result.info.secure_url)  
            setName(result.info.original_filename)
     
            setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      {/* <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button> */}

<div className="flex w-full justify-end"> 
         <button id="upload_widget"
            className="button text-xs bg-emerald-300  my-4 font-semibold py-1 px-3  rounded-full"
             onClick={initializeCloudinaryWidget}
         >
             Select Track
         </button>
         </div>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
