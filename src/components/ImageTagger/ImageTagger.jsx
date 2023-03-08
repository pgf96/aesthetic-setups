import Cursor from "../Cursor/Cursor";
import './ImageTagger.css'
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageTagger({ battlestation, handleUpdateAllItemPositions }) {


    const [isEditable, setIsEditable] = useState(false)
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [annotationData, setAnnotationData] = useState([])
    const [unsavedAnnotation, setUnsavedAnnotation] = useState([])

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
        function setSvgWidthHeight() {
            const img = imgRef.current
            const svg = svgRef.current
            if (img && svg) {
                svg.setAttribute('width', img.width)
                svg.setAttribute('height', img.height);
            }
        }
        getItems()
        setSvgWidthHeight()
    }, [battlestation])

    // useEffect(() => {
    //     const img = imgRef.current
    //     const svg = svgRef.current
    //     if (img && svg) {
    //         svg.setAttribute('width', img.width)
    //         svg.setAttribute('height', img.height);
    //     }
    // },[])


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

    return (
        <div>

            <Cursor svgRef={svgRef} setClickCoordinates={setClickCoordinates} />
            <div>
                The mouse is at position{' '}
                <b>({clickCoordinates.x}, {clickCoordinates.y})</b>
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
                <img
                    ref={imgRef}
                    src={battlestation.imageURL}
                    // style={{ position: 'absolute', width: '45rem', height: '30rem' }}
                    style={{ position: 'absolute', maxWidth:'100%', height: 'auto' }}
                />
                <svg
                    ref={svgRef}
                    style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        // width & height set in useEffect
                    }}>
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