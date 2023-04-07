import BattlestationList from "../../components/BattlestationList/BattlestationList"
import * as battlestationsAPI from '../../utilities/battlestations-api'
import { useState, useEffect } from "react"

export default function BattlestationPendingListPage() {
    const [pendingList, setPendingList] = useState([])

    useEffect(function() {
        async function getAllPendingBattlestations() {
            const pendingList = await battlestationsAPI.getAllPending()
            // console.log(pendingList)
            setPendingList(pendingList)
        }
        getAllPendingBattlestations()
    },[])

  return (
    <div style={{ margin: '9rem 0 0 0'}}>
        
        <BattlestationList battlestations={pendingList} />
    </div>
  )
}