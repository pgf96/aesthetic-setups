import BattlestationList from "../../components/BattlestationList/BattlestationList"
import * as battlestationsAPI from '../../utilities/battlestations-api'
import { useState, useEffect } from "react"

export default function BattlestationPendingListPage() {
    const [pendingList, setPendingList] = useState(null)

    useEffect(function() {
        async function getAllPendingBattlestations() {
            const pendingList = await battlestationsAPI.getAllPending()
            setPendingList(pendingList)
        }
        getAllPendingBattlestations()
    },[])

  return (
    <div>
        <BattlestationList battlestations={pendingList} />
    </div>
  )
}