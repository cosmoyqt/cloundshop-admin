import React from 'react'
import { Card, Button, Table } from 'antd'

function CustomTable (props) {
  return (
    <div>
      <Card
        title={props.title}
        extra={<Button type="primary" onClick={props.onClick}>新增</Button>}>
        <Table dataSource={props.datalist} columns={props.columns} rowKey='category_id' bordered ></Table>
      </Card>
    </div>
  )
}

export default CustomTable