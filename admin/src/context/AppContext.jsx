import { createContext } from "react";


export const AppContext=createContext()
const currencySymbol = "$";
 const calculateAge=(dob)=>{
    const today = new Date()
    const birthDate= new Date( dob)
  
    const age =  today.getFullYear()- birthDate.getFullYear()
    return age
  }
  const convertDate= ( date )=>{
    const arr= date.split('_')
      const months=["",'January','February','March','Epril','May','June','July','Augast','September',"October",'November','December']
      return arr[0]+" "+months[arr[1]]+" "+arr[2]
  }
const AppContextProvider=(props)=>{
  const value = {
    calculateAge,convertDate,currencySymbol
  }
  return (
    <AppContext.Provider value={value}>
       {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider