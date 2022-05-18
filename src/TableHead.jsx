import './css/modal.css'


const TableHead = ({ columns }) => {
    return (
     <thead className="titol-tabla">
      <tr>
       {columns.map(({ label, accessor, sortable }) => {
        return <th className='titol-tabla' style={{opacity: '0.9'}} key={accessor}>{label}</th>;
       })}
      </tr>
     </thead>
    );
   };
   
   export default TableHead;