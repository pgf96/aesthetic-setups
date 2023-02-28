import Cursor from "../Cursor/Cursor";
import { useState, useEffect, useRef } from "react";
import { EditableAnnotation, Label, Connector, CircleSubject } from "@visx/annotation";

export default function ImageTagger({ annotationData, setAnnotationData, height, width, svgRef }) {

    const imageSrc = "https://i.redd.it/vz16evolc7ka1.jpg"
    const [isEditable, setIsEditable] = useState(false)
    const [clickCoordinates, setClickCoordinates] = useState([]);
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

    // const inputRef = useRef(null)
    // const svgRef = useRef(null)

    useEffect(function () {
        function getAnnotations() {
            const annotations = annotationData
            setUnsavedAnnotation(annotations)
        }
        console.log('hi')
        getAnnotations()
    }, [])


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
        setAnnotationData((prevData) =>
            prevData.map((annotation) =>
                annotation.id === id ? { ...annotation, x, y, dx, dy } : annotation
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
                    <label for='edit'> edit </label>
                    <input type="checkbox" name='edit' onChange={handleCheck} />
                </div>
            </div>
        </div>
      );
    };