import nc from 'next-connect'
import notes from '../../../src/data/data'
import cors from 'cors';

const handler = nc()
  .use(cors())
  .get((req, res) => {
    res.json({data: notes})
  })
  .post((req, res) => {
    const id = Date.now()
    const note = {...req.body, id}

    notes.push(note)
    res.json({data: note})
  })
export default handler