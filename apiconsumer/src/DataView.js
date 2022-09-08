import React from 'react'
import ListItem from './ListItem'

const DataView = ({ data }) => {
  return (
    <div className="data-view">
      <div className="data-view__users">
        <ul>
          {data.map(el => (
            <ListItem
              key={el.id}
              data={JSON.stringify(el)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DataView