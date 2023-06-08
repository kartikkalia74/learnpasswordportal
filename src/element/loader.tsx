import  React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      {/* <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      /> */}
    </Box>
  );
}

export  function CustomizedProgressBars() {
    const [ value,setvalue] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{

        const token = localStorage.getItem('accessToken')
      console.log(token)
        if(token){
          navigate('/home')
        }else{
          navigate('/login')
        }
        const interval = setInterval(()=>{
            if(value+5>100){
                setvalue(5)
            }else{
                setvalue(value+5)
            }
            
        },200)
        return () => {
            // componentWillUnmount logic
            // This code will run when the component unmounts
      
            // Unsubscribe from the listener
            clearInterval(interval)
          };
    },[value])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress />
      <br />
      <BorderLinearProgress variant="determinate" value={value} />
      <br />
      <Box sx={{ position: 'relative' }}>
            Loading ...
       
      </Box>
    </Box>
  );
}