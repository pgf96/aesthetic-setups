import Cursor from "../Cursor/Cursor";
import './ImageTagger.css'
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageTagger({ battlestation, handleUpdateAllItemPositions, setLoaded }) {


    const [isEditable, setIsEditable] = useState(false)
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [annotationData, setAnnotationData] = useState([])
    const [unsavedAnnotation, setUnsavedAnnotation] = useState([])
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)

    const [newItem, setNewItem] = useState({
        title: '',
        x: 0,
        y: 0,
        dx: 120,
        dy: 60,
        width: 200,
        height: 100,
        id: 3
    })

    const inputRef = useRef(null)
    const svgRef = useRef(null)
    const imgRef = useRef(null)

    useEffect(function () {
        function getItems() {
            setUnsavedAnnotation(battlestation.items)
        }
        getItems()
    }, [battlestation])

    function handleSubmit(e) {
        e.preventDefault()
        setUnsavedAnnotation((prevData) => [...prevData, newItem]);
    }

    function handleChange(e) {
        setNewItem((prevData) => ({
            ...prevData,
            title: e.target.value,
            x: clickCoordinates.x,
            y: clickCoordinates.y,
        }))
    }

    function handleDragEnd({ x, y, dx, dy }, id) {
        setUnsavedAnnotation((prevData) =>
            prevData.map((annotation) =>
                annotation._id === id ? { ...annotation, x, y, dx, dy } : annotation
            )
        );
    }

    function handleAnnotationSave(e) {
        e.preventDefault()
        handleUpdateAllItemPositions(unsavedAnnotation)
    }



    function handleCheck() {
        setIsEditable(!isEditable)
        return isEditable
    }

    const [originalAspectRatio, setOriginalAspectRatio] = useState(null);

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => {
//       const aspectRatio = img.naturalWidth / img.naturalHeight;
//       console.log(`Image aspect ratio: ${aspectRatio}`);
//       setOriginalAspectRatio(aspectRatio);
//     };
//     img.src = battlestation.imageURL;
//   }, [battlestation]);


    function getImageDimension(aspectRatio) {
        if (Math.abs(aspectRatio - (3 / 4)) < Math.abs(aspectRatio - (4 / 3))) {
            return {width: 680, height: 900}
        } else {
            return {width: 900, height: 680}
        }
    }

  //naturalWidth and naturalHeight properties are metadata that are included in the image file 
  useEffect(() => {
    const img = new Image()
    img.src = battlestation.imageURL

    function getDimensions() {
        const naturalWidth = img.naturalWidth
        const naturalHeight = img.naturalHeight
        const aspectRatio = naturalWidth/naturalHeight
        console.log(aspectRatio)
        const width = getImageDimension(aspectRatio).width
        const height = getImageDimension(aspectRatio).height
        console.log(width, height)
        setWidth(width)
        setHeight(height)
        setLoaded(true)
    }

    img.addEventListener('load', getDimensions)
    return () => {
        img.removeEventListener('load', getDimensions)
        
    }
  },[battlestation])

    return (
        <div>
            
            <Cursor svgRef={svgRef} setClickCoordinates={setClickCoordinates} />
            <div>
                <span style={{color: 'white'}}> The mouse is at position{' '}</span> 
                <b style={{color: 'white'}}>({clickCoordinates.x}, {clickCoordinates.y})</b>
                <div>
                    <label> edit </label>
                    <input type="checkbox" name='edit' onChange={handleCheck} />
                    <button onClick={handleAnnotationSave}> click </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                value={newItem.title}
                                onChange={handleChange}
                                ref={inputRef}
                            />
                            <button type="submit">add to unsaved annotations</button>
                        </div>
                    </form>
                </div>
            </div>
   

            <div style={{ position: 'relative' }}>
                <svg ref={svgRef}
                width={width}
                height={height}
                // viewBox={`0 0 ${width} ${height}`}
                >
                    <image href={battlestation.imageURL} 
                    // width={width} 
                    // height={height} 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="xMidYMid slice"
                    />

                    {unsavedAnnotation && unsavedAnnotation.map((annotation) => (
                        <EditableAnnotation
                            key={annotation._id}
                            x={annotation.x}
                            y={annotation.y}
                            dx={annotation.dx}
                            dy={annotation.dy}
                            width={annotation.width}
                            height={annotation.height}
                            canEditSubject={isEditable}
                            canEditLabel={isEditable}
                            onDragEnd={(coord) => handleDragEnd(coord, annotation._id,)}>
                            <Connector
                                stroke={'black'}
                                type={'elbow'} />
                            <CircleSubject
                                stroke={'black'}
                                radius={3} />
                            <Label
                                title={annotation.name}
                                fontColor={'white'}
                                showBackground={true}
                                backgroundFill={'rgba(0, 0, 0, 0.3)'}
                                anchorLineStroke={'black'}
                                titleFontSize={'11'}
                            />
                        </EditableAnnotation>
                    ))}
                </svg>
            </div>

        </div>
    );
};