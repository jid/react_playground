import React from 'react'
import ListItem from './ListItem'

const DataView = ({ data }) => {
  return (
    <div className="data-view">
      <ol>
        {data.map(el => (
          <ListItem
            key={el.id}
            data={JSON.stringify(el)}
          />
        ))}
      </ol>
    </div>
  )
}

export default DataView