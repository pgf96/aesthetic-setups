import Cursor from "../Cursor/Cursor";
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageTagger({ battlestation}) {

    
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

    useEffect(function () {
        function getItems() {
            const items = battlestation.items
            setUnsavedAnnotation(items) 
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

    function handleAnnotationSave() {
        setAnnotationData(unsavedAnnotation)
    }

    function handleCheck() {
        setIsEditable(!isEditable)
        return isEditable
    }

    return (
        <div>
            {/* <Cursor svgRef={svgRef} inputRef={inputRef} setClickCoordinates={setClickCoordinates} setAnnotationData={setAnnotationData} /> */}
            <Cursor  svgRef={svgRef} setClickCoordinates={setClickCoordinates}  />
            <div>
                The mouse is at position{' '}
                <b>({clickCoordinates.x}, {clickCoordinates.y})</b>
                <div>
                    <label> edit </label>
                    <input type="checkbox" name='edit' onChange={handleCheck} />
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
                    <button onClick={handleAnnotationSave}> save annotations </button>
                </div>
            </div>
            <div style={{ position: 'absolute' }}>
                <img
                    src={battlestation.imageURL}
                    style={{ width: '1000px', height: '700px' }}
                />
                <svg
                    ref={svgRef}
                    style={{
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: '1000px', height: '700px'
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
                            />
                        </EditableAnnotation>
                    ))}
                </svg>
            </div>
        </div>
      );
    };