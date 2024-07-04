// import AWS from 'aws-sdk'
// import trashCan from './db.json' assert { type: 'json' }

// AWS.config.update({
//   region: 'us-east-1',
// })

// const dynamodb = new AWS.DynamoDB.DocumentClient()
// const tableName = 'dynamo38c2036d-dev'

// // 1.2MB 데이터를 400KB 청크로 나누는 함수
// function chunkData(data, chunkSize) {
//   const chunks = []
//   for (let i = 0; i < data.length; i += chunkSize) {
//     chunks.push(data.slice(i, i + chunkSize))
//   }
//   return chunks
// }

// // 데이터 처리 함수
// async function processData(data) {
//   const uniqueTrashCans = data.trashCan.reduce((acc, current) => {
//     const existing = acc.find((item) => item.Address === current.Address)
//     if (!existing) {
//       acc.push(current)
//     }
//     return acc
//   }, [])

//   const chunks = chunkData(uniqueTrashCans, 25) // 25개 항목씩 처리 (400KB 이하로 조절)

//   for (const chunk of chunks) {
//     const putRequests = chunk.map((item) => {
//       // "설치위치" 필드 제거
//       const { 설치위치, ...rest } = item
//       return {
//         PutRequest: { Item: rest },
//       }
//     })

//     const params = {
//       RequestItems: {
//         [tableName]: putRequests,
//       },
//     }
//     try {
//       const result = await dynamodb.batchWrite(params).promise()
//       // 3. 오류 처리 (예시)
//       if (
//         result.UnprocessedItems &&
//         Object.keys(result.UnprocessedItems).length > 0
//       ) {
//         console.warn('일부 항목 처리 실패:', result.UnprocessedItems)
//         // 실패한 항목 재처리 로직 추가
//       }
//     } catch (err) {
//       console.error('데이터 저장 중 오류 발생:', err)
//     }
//   }
// }

// // 데이터 로드 및 처리 (실제 데이터 로드 방식에 맞게 수정)
// const data = trashCan

// processData(data)
//   .then(() => console.log('데이터가 DynamoDB에 성공적으로 저장되었습니다.'))
//   .catch((err) => console.error('데이터 저장 중 오류 발생:', err))
