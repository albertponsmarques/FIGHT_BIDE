import { React, useState } from "react";
import { supabase } from "./supabaseClient";
import "./css/test.css";
import { useEffect } from "react";

function Blog() {
  const [ultimaID, setLastID] = useState(null);

  useEffect(() => {
    // call the async fetchData function
    fetchLastId()
  }, [])


  async function fetchLastId(){
    const { data } = await supabase
      .from('match')
      .select('id')
      .order("id", { ascending: false })
      .limit(1)

      setLastID(data)
      return data
  }

  getMatch(8,10)

  function getMatch(num, id){
    if(ultimaID != null){
      let lastID = ultimaID[0]
      console.log(lastID)
      lastID++
      console.log(lastID)
      let lastIDOctavos = []
      let lastIDCuartos = []
      let lastIDSemifinales = []
    
      if(num <= 64 && num > 32){
        
      } else if(num <= 32 && num > 16){
        
      } else if(num <= 16 && num > 8){
        for(var f = 0; f < 1; f++){
          for(var s = 0; s < 2; s++){
            for(var c = 0; c < 2; c++){
              for( var o = 0; o < 2; o++){
                newInsert(lastID, "octavos", id)
                lastIDOctavos.push(lastID)
                lastID++
              }
              newInsert(lastID, "cuartos", id, lastIDOctavos.pop(), lastIDOctavos.pop())
              lastIDCuartos.push(lastID)
              lastID++
            }
            newInsert(lastID, "semifinal", id, lastIDCuartos.pop(), lastIDCuartos.pop())
            lastIDSemifinales.push(lastID)
            lastID++
          }
          newInsert(lastID, "final", id, lastIDSemifinales.pop(), lastIDSemifinales.pop())
          lastID++
        }
      } else if(num <= 8 && num > 4){
        for(var f = 0; f < 1; f++){
          for(var s = 0; s < 2; s++){
            for(var c = 0; c < 2; c++){
              newInsert(lastID, "cuartos", id, null, null)
              lastIDCuartos.push(lastID)
              lastID++
            }
            newInsert(lastID, "semifinal", id, lastIDCuartos.pop(), lastIDCuartos.pop())
            lastIDSemifinales.push(lastID)
            lastID++
          }
          newInsert(lastID, "final", id, lastIDSemifinales.pop(), lastIDSemifinales.pop())
          lastID++
        }
      } else{

      }
    }
  }

  function newInsert(lastID, name, id, lastIDLocal, lastIDVisi){
    console.log("lastID: " + lastID + " - name: " + name + " - id: " + id + " - lastIDLocal: " + lastIDLocal + " - lastIDVisi: " + lastIDVisi)
  }


  return (
    <div>
      hola bon dia
    </div>
  );
}

export default Blog;
