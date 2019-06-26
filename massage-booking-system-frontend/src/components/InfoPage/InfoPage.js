import React from 'react'
import useField from '../../hooks/useField'

const InFoPage = (props) => {
  const { info, infoService } = props
  let contentField = useField('')
  let headerField = useField('')
  console.log('info props ', props)

  const changeAnnouncement = async event => {
    event.preventDefault()
    console.log('changeAnnouncement', contentField.value)
    const announcement = {
      header: headerField.value,
      content: contentField.value
    }
    infoService.create(announcement)
    contentField.reset()
    headerField.reset()
  }

  return (
    <div className="infoPage">
      <form className="dashboard_form" onSubmit={changeAnnouncement}>
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


        <button className="dashboard_announcement_button" type="submit">Update</button>
      </form>

      <div>
        <ul>
          {info.map(item => {
            return (
                <>
              <InfoItem key={item._id} header={item.header} content={item.content}/>
              <DeleteInfoItem id={item._id} infoService={infoService}/>
              </>
            )
          })}
        </ul>
      </div>
    </div>
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