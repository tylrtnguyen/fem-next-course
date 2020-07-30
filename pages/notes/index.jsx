// pages/notes/index.jsx
/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";

const NotesPage = ({ notes }) => {

  return (
    <div sx={{ variant: "containers.page" }}>
      <h1>My Notes</h1>

      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {notes.map((note) => (
          <div key={note.id} sx={{ width: "33%", p: 2 }}>
            <Link key={note.id} href="/notes/[id]" as={`/notes/${note.id}`}>
              <a sx={{ textDecoration: "none", cursor: "pointer" }}>
                <div sx={{ variant: "containers.card" }}>
                  <strong>{note.title}</strong>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
    const res = await fetch(`${process.env.API_URL}/api/notes/`)
    const { data } = await res.json();
    return {
        props: {notes: data}
    }
}

// To fetch one note
// export async function getServerSideProps({ params, req, res}) {
//     const response = await fetch(`http://localhost:3000/api/note/${params.id}`);

//     if(!response.ok) {
//         res.writeHEad(302, { Location: '/notes'})
//         res.end();
//         return { props: {}};
//     }

//     const { data } = res.json();

//     if(data) {
//         return {
//             props: {note: data}
//         }
//     }
// }

export default NotesPage;
