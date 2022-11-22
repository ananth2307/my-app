import { get, isEmpty } from 'lodash'
import React, { memo } from 'react'
import DataTable from '../../../app/common-components/DataTable'

const CreateDeletedDetails = (props) => {
  const createDeleteData = get(props,'bitBucketData.createDeleteDetailsData')
//   let tempData = {
//     "project": [
//         {
//             "deleted": 131,
//             "created": 136
//         }
//     ],
//     "repository": [
//         {
//             "deleted": 15,
//             "created": 28
//         }
//     ],
//     "user": [
//         {
//             "deleted": 3,
//             "created": 7
//         }
//     ],
//     "group": [
//         {
//             "deleted": 7,
//             "created": 1
//         }
//     ]
// }
const Headers = [
  {
  text:' ',
  key:1,
  value:0
 },
 {
  text:'Created',
  key:2,
  value:1
 },
 {
  text:'Deleted',
  key:3,
  value:2
 }
]
  let rowArray = [];
  !isEmpty(createDeleteData) && Object.keys(createDeleteData).map(key=>{
    createDeleteData[key].map(items=>{
        const {created,deleted} = items
        rowArray.push([key,created,deleted])
  });
  });
  return (
    
    <DataTable 
    headers={Headers}
    body={rowArray}
    isPagination={false}
    />
  )
}

export default memo(CreateDeletedDetails)