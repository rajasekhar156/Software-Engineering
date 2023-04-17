// import React, { useState } from "react"
// import axios from "axios";
// import { useNavigate } from "react-router-dom"

// export const Search = (props) => {
//     const [vehicleNumberSc, setVehicleNumber] = useState('');

//     const handleLatestEntry = async (e) => {
//         e.preventDefault();
//         navigate('/Home');
//     }
//     const handleActive = async (e) => {
//         e.preventDefault();
//         navigate('/ActiveEntries');
//     }
//     const handleAddEntry = async (e) => {
//         e.preventDefault();
//         navigate('/Add');
//     }
//     const handleEditEntry = async (e) => {
//         e.preventDefault();
//         navigate('/Edit');
//     }

//     // const handleSearch = async (e) => {
//     //     e.preventDefault();
//     //     // const info={email:email,password:password};
//     //     // setDataInput([info]);
//     //     // run();
//     //     searchVehicle();
//     // }

//     const fetchData = async (e) => {
//         e.preventDefault();
//         let url;
//         url = `http://localhost:5001/api/info?vehicleNumber=${vehicleNumberSc}`;
//         try {
//             const response = await axios.get(url);
//             setInVehicles(response.data);
//         } catch (err) {
//             console.error('Error fetching in vehicle\'s data: ', err);
//         }
//     }

//     return (
//         <div className="searchPage">
//             <div class="navbar navbar-fixed-top">
//                 <div class="navbar-header">
//                     <p class="navbar-brand" href="#">Search</p>
//                 </div>
//                 <div class="navbar-inner">
//                     <ul class="nav">
//                         <li class="active"><a href="#">Latest Entry</a></li>
//                         <li><a href="#">Active Entires</a></li>
//                         <li><a href="#">Add new Entry</a></li>
//                     </ul>
//                 </div>
//             </div>
//             <form className="Search-form" onSubmit={handleSearch}>
//                 <label>/Vehicle Reg. No. :</label>
//                 <input value={vehicleNumberSc} onChange={(e) => setVehicleNumber(e.target.value)} type='search' id='vehicleNumberSc'></input>
//                 <button type="submit">Enter</button>
//                 <button className="link-btn" onClick={() => props.onFormSwitch('forgotpass')}>ForgotPassword</button>
//             </form>
//         </div>
//     );
// }

