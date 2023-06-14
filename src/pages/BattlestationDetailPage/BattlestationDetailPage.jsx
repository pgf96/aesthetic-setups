

import './BattlestationDetailPage.css'
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import * as battlestationsAPI from '../../utilities/battlestations-api'
import * as itemsAPI from '../../utilities/items-api'
import { Container } from 'react-bootstrap'
import BattlestationTable from '../../components/BattlestationTable/BattlestationTable'
import ImageTagger from '../../components/ImageTagger/ImageTagger'
import Footer from '../../components/Footer/Footer'
import { useMediaQuery } from 'react-responsive'
import { useMemo } from 'react'
import { scaleLinear } from '@visx/scale'
import { Tooltip } from 'react-tooltip'
import { BiHelpCircle } from 'react-icons/bi'
import 'react-tooltip/dist/react-tooltip.css'
import Avatar from '@mui/material/Avatar';
import { AiOutlineStar } from 'react-icons/ai'


export default function BattlestationDetailPage({ user }) {

  const [battlestation, setBattlestation] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [unsavedAnnotation, setUnsavedAnnotation] = useState([])
  const [annotationData, setAnnotationData] = useState([])
  const [isPortrait, setIsPortrait] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(function () {
    async function getById() {
      const battlestation = await battlestationsAPI.getById(id)
      setBattlestation(battlestation)
    }
    getById()
  }, [])

  async function handleDelete() {
    await battlestationsAPI.deleteOne(id)
    navigate('/')
  }

  async function handleApprove() {
    const approve = await battlestationsAPI.approvePending(battlestation, id)
    setBattlestation(approve)
    navigate('/pending')
  }

  async function handleDeleteItem(itemId) {
    await itemsAPI.deleteItem(id, itemId)
    setBattlestation((prevData) => {
      const itemList = prevData.items.filter((item) => item._id !== itemId)
      return {
        ...prevData,
        items: itemList
      }
    })
  }

  // change add item to updating item set - unnecessary for single add item
  async function handleAddItem(itemData) {
    const newItemList = await itemsAPI.addItem(itemData, id)
    setBattlestation(prevData => ({
      ...prevData,
      items: newItemList
    }))
  }

  // async function handleCreateItem(e) {
  //   e.preventDefault();
  //   setAnnotationData((prevData) => [...prevData, newItem]);
  // }

  async function handleUpdateAllItemPositions(itemPositions) {
    const updatedItems = await itemsAPI.updateAllItemPositions(id, itemPositions)
    // console.log(updatedItems)
    setBattlestation(prevData => ({ ...prevData, items: updatedItems.items }))
  }

  function handleCheck() {
    setIsEditable(!isEditable)
    setIsSaved(false)
  }

  async function handleAnnotationSave(e) {
    e.preventDefault()
    await handleUpdateAllItemPositions(unsavedAnnotation)
    setIsSaved(true)
  }

  const largest = useMediaQuery({ query: '(min-width: 1540px)' })
  const large = useMediaQuery({ query: '(min-width: 1024px)' })
  const medium = useMediaQuery({ query: '(min-width: 768px)' })
  const small = useMediaQuery({ query: '(min-width: 480px)' })

  const width = largest ? 900 : large ? 850 : medium ? 600 : small ? 500 : 416;
  const height = largest ? 675 : large ? 637 : medium ? 450 : small ? 375 : 312;

  const customBreakPoint = useMediaQuery({ query: '(min-width: 1224px)' })
  const tableWidth = largest ? 450 : large ? 600 : medium ? 450 : small ? 375 : 345;

  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, 900],
        range: [0, width]
      }),
    [width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, 681],
        range: [0, height]
      }),
    [height]
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }





  return (
    <div className='BattlestationDetailPage'>
      <Container className='detail'>

        <div className='detail-picture'>
          <ImageTagger battlestation={battlestation} setIsPortrait={setIsPortrait} handleLoaded={handleLoaded} unsavedAnnotation={unsavedAnnotation} setUnsavedAnnotation={setUnsavedAnnotation} isEditable={isEditable} width={width} height={height} xScale={xScale} yScale={yScale} handleUpdateAllItemPositions={handleUpdateAllItemPositions} />
        </div>
        {loaded && <>
          <div className='detail-header'>
            <Avatar />
            <p style={{ margin: 0, paddingLeft: '1rem' }}>Username {battlestation.user}
              <span className='detail-header-small'><AiOutlineStar /> 5.0 |  {formatDate(battlestation.createdAt)} </span>
            </p>
          </div>

          <div className='display-info'>
            <BattlestationTable tableWidth={tableWidth} user={user} battlestation={battlestation} handleDeleteItem={handleDeleteItem} handleAddItem={handleAddItem} />
            <ul className='user-info'>
              <li style={{ float: 'left' }}> User: {battlestation.redditUser}</li>
              <li style={{ float: 'right' }} ><a href={battlestation.redditLink}> Link </a></li>
            </ul>

            {battlestation.approved ?
              "" : <li style={{ color: 'red' }}> "not approved"               <span data-tooltip-id='tooltip-pending' data-tooltip-html={'Posts are added to a pending list upon submission. <br/> Users with privileges approve or deny posts via <br/> the "/pending" route. The approved posts are publicly <br/> displayed with others.'}>
                <BiHelpCircle style={{ color: 'white' }} />
              </span>
                <Tooltip id='tooltip-pending' /></li>}
            {/* display approval button if not - refactor to check serverside roles instead of client side*/}
            {/* if id is the guest example id */}
            {(user && user.roles.includes('admin')) || battlestation._id === '63f662e91b6e69d4961170b6' ? (

              <>
                <div>
                  <label style={{ color: 'white' }}> Edit </label>
                  &nbsp;
                  <input type="checkbox" name='edit' onChange={handleCheck} />
                  <br />
                  {isEditable && (

                    <button className='button-control' onClick={handleAnnotationSave}> Save labels </button>
                  )}
                  {isSaved && isEditable && (
                    <span style={{ color: 'green' }}> Labels saved! </span>
                  )}
                </div>
                {user.roles.includes('admin') && (
                  <button style={{ margin: '10px 0 0 100px' }} className='button-control' onClick={handleDelete}> Delete </button>
                )}

                {battlestation.approved === !true && user.roles.includes('admin') && (

                  <button className='button-control' onClick={handleApprove}> approve </button>
                )}

              </>
            ) : null}
          </div>
        </>}
      </Container>
      {loaded && <Footer />}
    </div>
  )
}