import { useEffect, useState } from "react";
import {supabase} from './supabaseClient'
import getEquip from "./getEquipByID";

const TableBody = ({ tableData }) => {
    const bodyInfo = [...tableData].sort((a, b) => (a.points < b.points ? 1 : -1));
    const [equips, setEquips] = useState([])

    useEffect(() => {
        fetchEquips()
      })

    const fetchEquips = async () => {
        try{
            const { data } = await supabase
            .from('equip')
            .select('*')
        
            setEquips(data)
        } catch (e){
            console.log(e)
        }
    }


    return (
     <tbody>
      {bodyInfo.map((data) => {
       return (
        <tr key={data.id}> 
            <td>{getEquip(data.team, equips)}</td>
            <td>{data.matches_played}</td>
            <td>{data.scored}</td>
            <td>{data.points}</td>
        </tr>
       );
      })}
     </tbody>
    );
   };

export default TableBody