import { useState } from 'react'
import { db } from '../db'
import { useLiveQuery } from 'dexie-react-hooks'

async function addFriend(name: string, age: number) {
  try {
    const id = await db.friends.add({ name, age })
    console.log(id)
  } catch (e) {
    console.log(`Failed to add ${name}: ${e}`)
  }
}

function Friends() {
  const friends = useLiveQuery(async () =>
    db.friends.where('age').above(5).toArray(),
  )
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {friends?.map(friend => (
          <tr>
            <td>{friend.name}</td>
            <td>{friend.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Admin() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  return (
    <>
      <h1 className='text-2xl'>Phil 208 Ethics Project</h1>
      <p>Here is some text!!!</p>
      <Friends />
      <input
        className='border-2'
        onChange={e => setName(e.target.value)}
      ></input>
      <input
        className='border-2'
        type='number'
        onChange={e => setAge(parseInt(e.target.value))}
      ></input>
      <button onClick={() => addFriend(name, age)}>Submit</button>
    </>
  )
}

export default Admin
