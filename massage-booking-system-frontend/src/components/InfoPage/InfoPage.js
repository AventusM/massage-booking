import React, { useContext, useEffect, useState } from 'react'
import useField from '../../hooks/useField'
import { UserContext } from '../../App'

const InFoPage = (props) => {
  const { info, infoService } = props
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  console.log('info props ', props)

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [user])

  return (loaded &&
    <div className="infoPage">

      {user.admin && <CreateInfoItem infoService={infoService} />}
      <div>
        <ul>
          {info.map(item => {
            return (
                <>
              <InfoItem key={item._id} header={item.header} content={item.content}/>
              {user.admin && <DeleteInfoItem id={item._id} infoService={infoService}/>}
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const CreateInfoItem = (props) => {
  const { infoService } = props
  let contentField = useField('')
  let headerField = useField('')

  const createInfoItem = async event => {
    event.preventDefault()
    const infoItem = {
      header: headerField.value,
      content: contentField.value
    }
    infoService.create(infoItem)
    contentField.reset()
    headerField.reset()
  }

  return (
    <form className="dashboard_form" onSubmit={createInfoItem}>
      <div>
        Header
        <input
          value={headerField.value}
          onChange={headerField.handleFieldChange}
        />
      </div>
      <div>
            Content
        <input className="dashboard_announcement"
          value={contentField.value}
          onChange={contentField.handleFieldChange}
        />
      </div>


      <button className="dashboard_announcement_button" type="submit">Add info</button>
    </form>
  )
}

const InfoItem = (props) => {
  const { header, content } = props

  return (
    <li className="infoItem">
      <h2>{header}</h2>
      <div>{content}</div>
    </li>
  )
}

const DeleteInfoItem= (props) => {
  const { id, infoService } = props

  const deleteItem = async () => {
    try {
      console.log('tried to delete')
      console.log('delete props ', props)
      await infoService.remove(id)
      // Add notification here for deleting item
    } catch (exception) {
      console.log('ERROR in DeleteInfoItem ', exception)
    }
  }

  return (
    <button onClick={deleteItem}>Delete</button>
  )
}

export default InFoPage