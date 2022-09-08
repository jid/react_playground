import React from 'react'
import ListItem from './ListItem'

const DataView = ({ data }) => {
  return (
    <div className="data-view">
      <table className="data-view__table">
        <thead>
          <tr>
            {Object.keys(data[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(el => (
            <tr key={el.id}>
              {Object.keys(el).map(key => (
                <td key={key}>{JSON.stringify(el[key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataView