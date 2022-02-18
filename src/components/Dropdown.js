import React from 'react'
import PropTypes from 'prop-types'

function Dropdown(props) {
  const [viewDropdown, setViewDropdown] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([])
  const dropRef = React.useRef()

  const handleOpenDropdown = () => {
    setViewDropdown(!viewDropdown)
  }
  const handleWindowClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(dropRef.current)) {
      setViewDropdown(false)
    }
  }
  const deleteSelectedItem = (index) => {
    let arr
    arr = selectedItems.slice()
    arr.splice(index, 1)
    setSelectedItems(arr)
  }
  const onSelectItem = (id) => {
    let arr
    props.multiSelect ? (arr = selectedItems.slice()) : (arr = [])
    if (!arr.includes(props.items[id])) {
      arr.push(props.items[id])
    } else {
      return deleteSelectedItem(arr.indexOf(props.items[id]))
    }
    setSelectedItems(arr)
  }
  React.useEffect(() => {
    document.body.addEventListener('click', handleWindowClick)
  }, [])
  return (
    <div ref={dropRef} className="dropdown">
      <div className="dropdown__info">
        <div>
          {selectedItems &&
            selectedItems.map((data, ind) => (
              <div className="dropdown__selected" key={`${data.id}_${ind}`}>
                {data.name}
                <span className="dropdown__del" onClick={() => deleteSelectedItem(ind)}>
                  X
                </span>
              </div>
            ))}
          <div>{props.title}</div>
        </div>
        <div onClick={handleOpenDropdown}>
          <img
            className={'dropdown__arrow' + (viewDropdown ? ' open' : '')}
            src="/assets/arrow.png"
            alt=""
          />
        </div>
      </div>
      {viewDropdown && (
        <ul>
          {props.items &&
            props.items.map((obj, index) => (
              <li
                key={`${obj.id}_${index}`}
                onClick={() => onSelectItem(obj.id)}
                className={
                  'item' + (selectedItems && selectedItems.includes(obj) ? ' checked' : '')
                }>
                {obj.name}
                <span className="check">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none">
                      <path
                        d="M3172 2967 l-1542 -1542 -608 608 c-334 334 -612 607 -617 607 -6 0
                                -100 -90 -210 -200 l-200 -200 810 -810 c445 -446 814 -810 820 -810 6 0 794
                                784 1753 1743 l1742 1742 -203 203 -202 202 -1543 -1543z"
                      />
                    </g>
                  </svg>
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool.isRequired,
}

export default Dropdown
