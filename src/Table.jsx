import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'

const Table = () => {
  const {id} = useParams()
  const [tableData, setTableData] = useState([]);

 useEffect(() => {
  fetchLeagueTable()
  })


 const fetchLeagueTable = async () => {
    try{
      const { data } = await supabase
      .from('league_table')
      .select('*')

      //Filters
      .eq('tournament', id)

      setTableData(data)
    } catch (e){
      console.log(e)
    }
  }

 const columns = [
  { label: "Team", accessor: "team", sortable: false },
  { label: "Matches Played", accessor: "matches_played", sortable: true },
  { label: "Scores", accessor: "scored", sortable: true },
  { label: "Points", accessor: "points", sortable: true },
 ];

 return (
  <>
   <table className="table">
    <TableHead columns={columns} />
    <TableBody tableData={tableData} />
   </table>
  </>
 );
};

export default Table;
