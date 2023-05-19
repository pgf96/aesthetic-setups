import Cursor from "../Cursor/Cursor";
import './ImageTagger.css'
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject, LineSubject } from "@visx/annotation";

export default function ImageTagger({ battlestation, handleLoaded, xScale, yScale, width, height, isEditable, unsavedAnnotation, setUnsavedAnnotation, setIsPortrait }) {

    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [svgWidth, setSvgWidth] = useState(1)
    const [svgHeight, setSvgHeight] = useState(1)

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
    const svgRef = useRef(null)

    useEffect(() => {
        async function getItems() {
          if (battlestation.items) {
            setUnsavedAnnotation(battlestation.items);
          }
        }
        getItems();
      }, [battlestation]);

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
            setIsPortrait(true)
            return { width: height, height: width }
        } else {
            setIsPortrait(true)
            return { width: width, height: height }
        }
    }

    // naturalWidth and naturalHeight properties are metadata that are included in the image file 
    // once image contents are loaded (NOT RENDERED) then set the correct aspect ratio 
    // render image with correct dimensions

    useEffect(() => {
        const img = new Image()
        img.src = battlestation.imageURL

        function getDimensions() {
            const naturalWidth = img.naturalWidth
            const naturalHeight = img.naturalHeight
            const aspectRatio = naturalWidth / naturalHeight
            const width = getImageDimension(aspectRatio).width
            const height = getImageDimension(aspectRatio).height
            setSvgWidth(width)
            setSvgHeight(height)
            handleLoaded()
        }

        // once image is loaded grab dimensions
        img.addEventListener('load', getDimensions)
        return () => {
            img.removeEventListener('load', getDimensions)

        }
    }, [battlestation.imageURL, width, height])

    return (
        <div className="svg-cursor-image-container">
            <Cursor svgRef={svgRef} setClickCoordinates={setClickCoordinates} />
            <div className='main-image' style={{ position: 'relative' }}>
                <svg 
                    style={{borderRadius: 0}}
                    ref={svgRef}
                    width={svgWidth}
                    height={svgHeight}
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
                            width={svgWidth}
                            height={svgHeight}
                            canEditSubject={isEditable}
                            canEditLabel={isEditable}
                            subjectDragHandleProps={{ style: { stroke: 'rgba(255, 0, 0)' }, r: 15 }}
                            labelDragHandleProps={{ style: { stroke: 'rgba(0, 255, 0)' }, r: 10 }}

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
                                type={'elbow'}
                                pathProps={{ strokeWidth: '1.8' }}

                            />

                            <CircleSubject
                                stroke={'black'}
                                radius={3}
                                fill={'white'}
                            />

                            <Label
                                maxWidth={xScale(100)}
                                titleFontSize={xScale(12)}
                                className="change-font"
                                title={annotation.model}
                                fontColor={'white'}
                                showBackground={true}
                                backgroundFill={'rgba(0, 0, 0, 0.3)'}
                                anchorLineStroke={'black'}
                                showAnchorLine={false}
                                backgroundProps={{ rx: 10, }}

                            />
                            <LineSubject
                                stroke={'green'}
                            />
                        </EditableAnnotation>
                    ))}
                </svg>
            </div>
        </div>
    );
};