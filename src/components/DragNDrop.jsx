import React, { useState, useRef } from "react";

function DragNDrop(props) {
  const [list, setList] = useState(props.data);
  const [isDragging, setIsDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpIndx].items.splice(
          params.itemIndx,
          0,
          newList[currentItem.grpIndx].items.splice(currentItem.itemIndx, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIndx === params.grpIndx &&
      currentItem.itemIndx === params.itemIndx
    ) {
      return "item dragging";
    }
    return "item";
  };

  return (
    <div className='container'>
      {list.map((grp, grpIndx) => (
        <div
          key={grp.title}
          className='box'
          onDragEnter={
            isDragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpIndx, itemIndx: 0 })
              : null
          }
        >
          <h2>{grp.title}</h2>
          {grp.items.map((item, itemIndx) => (
            <div
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, { grpIndx, itemIndx })}
              onDragEnter={
                isDragging
                  ? (e) => handleDragEnter(e, { grpIndx, itemIndx })
                  : null
              }
              className={isDragging ? getStyles({ grpIndx, itemIndx }) : "item"}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DragNDrop;
