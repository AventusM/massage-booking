import React, { useContext, useEffect, useState } from 'react'
import useField from '../../hooks/useField'
import { UserContext, NotificationContext } from '../../App'
import Notification from '../Notification/Notification'

const InFoPage = (props) => {
  const { info, infoService } = props
  const { user } = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  const { announcement, notification, createNotification } = useContext(NotificationContext)

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [user])

  return (loaded &&
    <div className="infoPage">
      {notification && <Notification notification={notification} />
      }
      {user.admin && <CreateInfoItem infoService={infoService} createNotification={createNotification}/>}
      <div>
        <ul>
          {info.map(item => {
            return (
                <>
              <InfoItem key={item._id} header={item.header} content={item.content}/>
              {user.admin && <DeleteInfoItem id={item._id} infoService={infoService} createNotification={createNotification}/>}
              </>
            )
          })}
        </ul>
      </div>
      <div>
        {announcement && announcement.message
          ? <div className="index_notice">
            <h2>Notice</h2>
            <p>{announcement.message}</p>
          </div>
          : null}
      </div>
    </div>
  )
}

const CreateInfoItem = (props) => {
  const { infoService, createNotification } = props
  let contentField = useField('')
  let headerField = useField('')

  const createInfoItem = async event => {
    if (contentField.value === '') {
      createNotification('Cant create info item without content ')
    } else {
      event.preventDefault()

      const infoItem = {
        header: headerField.value,
        content: contentField.value
      }

      infoService.create(infoItem)
      contentField.reset()
      headerField.reset()
      createNotification('Info item created', 'success')
    }

  }

  return (
    <form className="create_info_item_form" onSubmit={createInfoItem}>
      <div>
        Header (optional)
        <br/>
        <input className="info_header_input"
          value={headerField.value}
          onChange={headerField.handleFieldChange}
        />
      </div>
      <div>
            Content (required)
        <input className="info_content_input"
          value={contentField.value}
          onChange={contentField.handleFieldChange}
        />
      </div>


      <button className="dashboard_announcement_button" type="submit">Add info</button>
      <hr />
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
  const { id, infoService, createNotification } = props

  const deleteItem = async () => {
    try {
      await infoService.remove(id)
      createNotification('item deleted', 'success')
    } catch (exception) {
      createNotification('Failed to delete item')
    }
  }

  return (
    <button onClick={deleteItem} className="delete_info_button">Delete</button>
  )
}

export default InFoPage