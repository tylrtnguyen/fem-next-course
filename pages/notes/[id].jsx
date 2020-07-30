// pages/[id].jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link';
import notes from '../../src/data/data';

export default ({note: {title, body}} = {}) => {
  const router = useRouter()
  const { id }= router.query
  

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}


export async function getServerSideProps({params, req, res}) {
    const response = await fetch(`${process.env.API_URL}/api/notes/${params.id}/`)
  
    if (!response.ok) {
      res.writeHead(302, { Location: "/notes" })
      res.end();
      return {props: {}}
    }
  
    const {data} = await response.json()
    
    if (data) {
      return {
        props: {note: data}
      }
    }
  }