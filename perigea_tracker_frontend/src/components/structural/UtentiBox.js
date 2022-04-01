import React from 'react';
import CardDetails from './CardDetails';
import Box from './Box';

export default function UtentiBox({ ...props }) {
  return(
    <Box className="utenti" details={<CardDetails { ...props}/>} >
    </Box>
  )
}
