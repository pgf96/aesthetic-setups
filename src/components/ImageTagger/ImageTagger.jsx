import Cursor from "../Cursor/Cursor";
import './ImageTagger.css'
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageTagger({ battlestation, handleUpdateAllItemPositions, setLoaded, xScale, yScale, width, height, isEditable, unsavedAnnotation, setUnsavedAnnotation }) {


    // const [isEditable, setIsEditable] = useState(false)
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [annotationData, setAnnotationData] = useState([])
    // const [unsavedAnnotation, setUnsavedAnnotation] = useState([])
    const [width1, setWidth1] = useState(1)
    const [height1, setHeight1] = useState(1)

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

    // function handleAnnotationSave(e) {
    //     e.preventDefault()
    //     handleUpdateAllItemPositions(unsavedAnnotation)
    // }



    // function handleCheck() {
    //     setIsEditable(!isEditable)
    //     return isEditable
    // }

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
            // 3:4 flip vs 4:3
            return {width: height, height: width}
        } else {
            return {width: width, height: height}
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
        setWidth1(width)
        setHeight1(height)
        setLoaded(true)
    }

    img.addEventListener('load', getDimensions)
    return () => {
        img.removeEventListener('load', getDimensions)
        
    }
  },[battlestation, width, height])

    return (
        <div>
            
            <Cursor svgRef={svgRef} setClickCoordinates={setClickCoordinates} />
            {/* <div>
                <span style={{color: 'white'}}> here is the {xScale(1)} </span> 
                <br /> 
                <span style={{color: 'white'}}> The mouse is at position{' '}</span> 
            
                <b style={{color: 'white'}}>({clickCoordinates.x}, {clickCoordinates.y})</b>
                <div>
                    <label> edit </label>
                    <input type="checkbox" name='edit' onChange={handleCheck} />
                    <button onClick={handleAnnotationSave}> click </button>
                </div>
            </div> */}
   

            <div className='main-image'style={{ position: 'relative' }}>
                <svg ref={svgRef}
                width={width1}
                height={height1}
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
                            x={xScale(annotation.x)}
                            y={yScale(annotation.y)}
                            dx={xScale(annotation.dx)}
                            dy={yScale(annotation.dy)}
                            width={annotation.width}
                            height={annotation.height}
                            canEditSubject={isEditable}
                            canEditLabel={isEditable}
                            onDragEnd={({ x, y, dx, dy }) => {
                                // coordinates are passed as unscaled in order to preserve the original coordinate data
                                const unscaledX = xScale.invert(x)
                                const unscaledY = yScale.invert(y)
                                const unscaledDx = xScale.invert(dx)
                                const unscaledDy = yScale.invert(dy)
                                handleDragEnd({ x: unscaledX, y: unscaledY, dx: unscaledDx, dy: unscaledDy }, annotation._id);
                              }}
                            >
                            <Connector
                                stroke={'black'}
                                type={'elbow'} />
                            <CircleSubject
                                stroke={'black'}
                                radius={3} />
                            <Label
                                maxWidth={xScale(150)}
                                titleFontSize={xScale(12)}
                                title={annotation.model}
                                fontColor={'white'}
                                showBackground={true}
                                backgroundFill={'rgba(0, 0, 0, 0.3)'}
                                anchorLineStroke={'black'}
                                backgroundPadding={xScale(12)}
                            />
                        </EditableAnnotation>
                    ))}
                </svg>
            </div>

        </div>
    );
};