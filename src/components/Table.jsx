import React from 'react'
import { Card, Button, Table } from 'antd'

function CustomTable (props) {
  return (
    <div>
        <Table dataSource={props.datalist} columns={props.columns} rowKey={props.rowKey} bordered ></Table>
    </div>
  )
}

export default CustomTable