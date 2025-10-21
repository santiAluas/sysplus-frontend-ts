// import React, { useEffect, useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';
// import { Get_Organizations } from '../../../';


// const SearchByZona = ({setCodAgencia}) => {
//     const [organizations, setOrganizations] = useState([{ ad_org_id: "", name: "--SELECCIONAR AGENCIA--" }]);
//     const get_Organitations = async () => {
//         const response = await Get_Organizations();
//         // response.push({ad_org_id: "0",name: "0"})
//         setOrganizations(prevOrganizations => [...prevOrganizations, ...response]);
//     };

//     const handleSelect = (event, newValue) => {
//         event.preventDefault()
//         setCodAgencia(newValue ? newValue.value : null);
//     };
//     useEffect(() => {
//         get_Organitations();
//     }, []);
//     return (
//     <Stack spacing={2} sx={{ width: "100%" }}>
//       <Autocomplete
//         freeSolo
//         id="free-solo-2-demo"
//         disableClearable
//         options={organizations.map((org) => ({
//             value: org.ad_org_id,
//             label: org.name,
//           }))}
//         isOptionEqualToValue={(option, value) => option.value === value}
//         onChange={handleSelect}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="AGENCIAS"
//             InputProps={{
//               ...params.InputProps,
//               type: 'search',
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// }
// export default SearchByZona

