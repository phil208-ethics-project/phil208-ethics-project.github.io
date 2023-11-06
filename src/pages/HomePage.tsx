import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

import { db } from '../db'

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

function HomePage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  return (
    <>
      <h1 className='text-2xl'>Phil 208 Ethics Project</h1>
      <p>Here is some text!!!</p>
      <Friends />
      <input
        className='border-2 block'
        onChange={e => setName(e.target.value)}
      ></input>
      <input
        className='border-2 block'
        type='number'
        onChange={e => setAge(parseInt(e.target.value))}
      ></input>
      <button className='' onClick={() => addFriend(name, age)}>
        Submit
      </button>
    </>
  )
}

export default HomePage
