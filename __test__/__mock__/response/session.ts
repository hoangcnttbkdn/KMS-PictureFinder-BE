const objectSession = {
  id: 1,
  url: 'https://www.facebook.com/media/set/?set=a.1382515015345749&type=3',
  targetImageUrl:
    'https://pbl6.s3.ap-southeast-1.amazonaws.com/kms-picture-finder/1670430212769-8718.png',
  bib: null,
  email: null,
  totalImages: 14,
  type: 'FACEBOOK',
  typeRecognize: 'FACE',
  isFinished: true,
  createdAt: '2022-12-07T09:23:34.153Z',
  updatedAt: '2022-12-07T09:25:06.572Z',
}

const objectSessionFail = {
  message: 'invalid input syntax for type integer: "NaN"',
}

const sessionImages = [
  {
    code: '2044652819131962',
    createdAt: '2022-12-07T09:23:34.876Z',
    errorLogs: null,
    extraData:
      '{"numberOfFace":1,"faceLocation":[406,414,632,693],"confident":0.7837262153625488}',
    id: 5,
    isMatched: true,
    recognizedAt: '2022-12-07T16:23:57.231Z',
    updatedAt: '2022-12-07T09:23:57.494Z',
    url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/32929179_2044652825798628_5603887974212173824_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=Tr6P-s03wfgAX-CUkQ6&_nc_oc=AQlUznx0H73IapmOP7aMOsAOavQ5zzve3eMbPg7cSJ0hSCIZNOj2mQ1cgGbBhwM6mKU&_nc_ht=scontent.fdad1-3.fna&oh=00_AfAzq-8kbCKtWDzPcC5zvnQv1pKt0ous5eAnCXHIeUVk-g&oe=63B84889',
  },
  {
    code: '3084268818503685',
    createdAt: '2022-12-07T09:23:34.449Z',
    errorLogs: null,
    extraData:
      '{"numberOfFace":4,"faceLocation":[643,1047,730,1159],"confident":0.5790806412696838}',
    id: 2,
    isMatched: true,
    recognizedAt: '2022-12-07T16:23:57.231Z',
    updatedAt: '2022-12-07T09:23:57.501Z',
    url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/276315283_3084268805170353_6012057129765531591_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=teSKguVbBqAAX-2TxlD&_nc_ht=scontent.fdad1-3.fna&oh=00_AfD0K9kClhQFPvV5UF5HkM0PiVbplTnXUD0r9AuvfuF6oQ&oe=6394D125',
  },
  {
    code: '1695289840734930',
    createdAt: '2022-12-07T09:23:36.059Z',
    errorLogs: null,
    extraData:
      '{"numberOfFace":4,"faceLocation":[150,115,329,328],"confident":0.6935544610023499}',
    id: 10,
    isMatched: true,
    recognizedAt: '2022-12-07T16:24:16.445Z',
    updatedAt: '2022-12-07T09:24:16.893Z',
    url: 'https://scontent.fdad1-2.fna.fbcdn.net/v/t31.18172-8/13329587_1695289840734930_6580895284616254287_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=FqKuEo5xwOEAX8Rp4dx&_nc_ht=scontent.fdad1-2.fna&oh=00_AfCEnGGvJ4JFhqjDGrja-sfnfefRDu7kjbbRmoF_l_Oidg&oe=63B8320A',
  },
  {
    code: '1581036662160249',
    createdAt: '2022-12-07T09:23:36.336Z',
    errorLogs: null,
    extraData:
      '{"numberOfFace":2,"faceLocation":[478,90,552,183],"confident":0.514033317565918}',
    id: 12,
    isMatched: true,
    recognizedAt: '2022-12-07T16:24:16.445Z',
    updatedAt: '2022-12-07T09:24:16.897Z',
    url: 'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.18169-9/11709429_1581036662160249_4415835776047212048_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=zAo7aFBkM4cAX_iN2_0&_nc_ht=scontent.fdad1-1.fna&oh=00_AfCnxV508MW1fqTLJdAVgxbF0cHV6_e6Po0lGxNau08NrA&oe=63B84442',
  },
]

export { objectSession, objectSessionFail, sessionImages }
