import { useEffect, useState } from "react"
import { GetPassword } from "../../helphers/api"
import './index.css'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button } from "@mui/material";
import { decrypt } from "../../helphers";

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export  const ListPasswords = ()=>{
const [list,setList]= useState<{id:string,name:string,url:string,hint:string,password:string}[]>([])
const [secret, setSecret] = useState('')
console.log('test1')
useEffect(()=>{
    console.log('test1')
    recieveResponse()
    
},[])

useEffect(()=>{
  if(secret){
  setList(list.map((each)=> ({...each,password:decrypt(each.password,secret)})))
  }
},[secret])


const recieveResponse = async () => {
   const response = await  GetPassword()
   setList(response.data.map((each:any)=>({id:each._id,...each,userName:each.email})))
}

const { data } = useDemoData({
  dataSet: 'Employee',
  visibleFields: VISIBLE_FIELDS,
  rowLength: 100,
});


const columns =[{field:'name',headerName:'Name'},{field:'url', headerName:'Url'},{field:'hint',headerName:'hint'},{field:'password',headerName:'Password'},{field:'userName',headerName:'username/email'}]
console.log(list)
    return (
        <div className="password_section" style={{ height: 400, width: '100%' }}>
           <Box sx={{ height: 400, width: 1 }}>
            <Button onClick={()=>{

             const password =  prompt('enter password for decrept')?.toString() as string
            
             setSecret(password)
            }}> show Password</Button>
      <DataGrid
        {...data}
        
        rows={list}
        initialState={{
          ...data.initialState,
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [''],
            },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
           
            
        
        </div>
    )
}